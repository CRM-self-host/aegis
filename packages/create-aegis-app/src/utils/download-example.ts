import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'node:os';
import chalk from 'chalk';

const AEGIS_REPO_OWNER = 'u84u';
const AEGIS_REPO_NAME = 'aegis';
const AEGIS_FALLBACK_REF = 'main';
const AEGIS_EXAMPLES_PATH = 'packages/aegis-apps/examples';
const AEGIS_EXAMPLES_URL = `https://github.com/${AEGIS_REPO_OWNER}/${AEGIS_REPO_NAME}/tree/${AEGIS_FALLBACK_REF}/${AEGIS_EXAMPLES_PATH}`;

// Fetches the latest release tag from the repo, or falls back to main
const resolveRef = async (): Promise<string> => {
  const response = await fetch(
    `https://api.github.com/repos/${AEGIS_REPO_OWNER}/${AEGIS_REPO_NAME}/releases/latest`,
    { headers: { Accept: 'application/vnd.github.v3+json' } },
  );

  if (response.ok) {
    const release = (await response.json()) as { tag_name: string };

    return release.tag_name;
  }

  return AEGIS_FALLBACK_REF;
};

// Uses the GitHub Contents API to list directories — fast and doesn't download the repo
const fetchGitHubDirectoryContents = async (
  path: string,
  ref: string,
): Promise<{ name: string; type: string }[] | null> => {
  const apiUrl = `https://api.github.com/repos/${AEGIS_REPO_OWNER}/${AEGIS_REPO_NAME}/contents/${path}?ref=${ref}`;

  const response = await fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return null;
  }

  return data as { name: string; type: string }[];
};

const listAvailableExamples = async (ref: string): Promise<string[]> => {
  const contents = await fetchGitHubDirectoryContents(AEGIS_EXAMPLES_PATH, ref);

  if (!contents) {
    return [];
  }

  return contents
    .filter((entry) => entry.type === 'dir')
    .map((entry) => entry.name);
};

const validateExampleExists = async (
  exampleName: string,
  ref: string,
): Promise<void> => {
  const examplePath = `${AEGIS_EXAMPLES_PATH}/${exampleName}`;

  const contents = await fetchGitHubDirectoryContents(examplePath, ref);

  if (contents !== null) {
    return;
  }

  const availableExamples = await listAvailableExamples(ref);

  throw new Error(
    `Example "${exampleName}" not found.\n\n` +
      (availableExamples.length > 0
        ? `Available examples:\n${availableExamples.map((name) => `  - ${name}`).join('\n')}\n\n`
        : '') +
      `Browse all examples: ${AEGIS_EXAMPLES_URL}`,
  );
};

export const downloadExample = async (
  exampleName: string,
  targetDirectory: string,
): Promise<void> => {
  if (
    exampleName.includes('/') ||
    exampleName.includes('\\') ||
    exampleName.includes('..')
  ) {
    throw new Error(
      `Invalid example name: "${exampleName}". Example names must be simple directory names (e.g., "hello-world").`,
    );
  }

  const ref = await resolveRef();
  const examplePath = `${AEGIS_EXAMPLES_PATH}/${exampleName}`;

  console.log(chalk.gray(`Resolving examples from ref '${ref}'...`));

  await validateExampleExists(exampleName, ref);

  console.log(chalk.gray(`Example '${examplePath}' validated successfully.`));

  const tarballUrl = `https://codeload.github.com/${AEGIS_REPO_OWNER}/${AEGIS_REPO_NAME}/tar.gz/${ref}`;

  const tempDir = join(
    tmpdir(),
    `create-aegis-app-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );

  try {
    await fs.ensureDir(tempDir);

    console.log(chalk.gray(`Downloading tarball from ${tarballUrl}...`));

    const response = await fetch(tarballUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Could not find repository: ${AEGIS_REPO_OWNER}/${AEGIS_REPO_NAME} (ref: ${ref})`,
        );
      }
      throw new Error(
        `Failed to download from GitHub: ${response.status} ${response.statusText}`,
      );
    }

    console.log(chalk.gray('Tarball downloaded. Writing to disk...'));

    const tarballPath = join(tempDir, 'archive.tar.gz');

    const buffer = Buffer.from(await response.arrayBuffer());

    await fs.writeFile(tarballPath, buffer);

    console.log(
      chalk.gray(
        `Tarball saved (${(buffer.length / 1024 / 1024).toFixed(1)} MB). Extracting...`,
      ),
    );

    execSync(`tar xzf "${tarballPath}" -C "${tempDir}"`, {
      stdio: 'pipe',
    });

    // GitHub tarballs extract to a directory named {repo}-{ref}/
    const extractedEntries = await fs.readdir(tempDir);
    const extractedDir = extractedEntries.find(
      (entry) => entry !== 'archive.tar.gz',
    );

    if (!extractedDir) {
      throw new Error('Failed to extract archive: no directory found');
    }

    const sourcePath = join(tempDir, extractedDir, examplePath);

    if (!(await fs.pathExists(sourcePath))) {
      throw new Error(
        `Example directory not found in archive: "${examplePath}"`,
      );
    }

    await fs.copy(sourcePath, targetDirectory);
  } finally {
    await fs.remove(tempDir);
  }
};

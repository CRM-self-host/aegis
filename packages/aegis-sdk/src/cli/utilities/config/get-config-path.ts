import * as os from 'os';
import * as path from 'path';

const AEGIS_DIR = path.join(os.homedir(), '.aegis');

export const getConfigPath = (test = false): string => {
  if (test || process.env.NODE_ENV === 'test') {
    return path.join(AEGIS_DIR, 'config.test.json');
  }

  return path.join(AEGIS_DIR, 'config.json');
};

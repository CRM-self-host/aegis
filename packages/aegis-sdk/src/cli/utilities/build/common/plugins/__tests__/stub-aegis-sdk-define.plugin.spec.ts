import * as aegisSdkDefine from '@/sdk/define';
import {
  AEGIS_SDK_DEFINE_STUBBED_EXPORTS,
  isDefineFactoryExportName,
} from '@/cli/utilities/build/common/plugins/stub-aegis-sdk-define.plugin';

describe('stub-aegis-sdk-define plugin', () => {
  const realExports = Object.keys(aegisSdkDefine).sort();
  const stubbedExports = [
    ...AEGIS_SDK_DEFINE_STUBBED_EXPORTS.factories,
    ...AEGIS_SDK_DEFINE_STUBBED_EXPORTS.any,
  ].sort();

  it('classifies every aegis-sdk/define value-export', () => {
    expect(stubbedExports).toEqual(realExports);
  });

  it('classifies all defineX exports (and createValidationResult) as factories', () => {
    const expectedFactories = realExports
      .filter(isDefineFactoryExportName)
      .sort();

    expect([...AEGIS_SDK_DEFINE_STUBBED_EXPORTS.factories].sort()).toEqual(
      expectedFactories,
    );
  });

  it('every factory is callable in the real module (would-be misclassification guard)', () => {
    for (const name of AEGIS_SDK_DEFINE_STUBBED_EXPORTS.factories) {
      const actual = (aegisSdkDefine as unknown as Record<string, unknown>)[
        name
      ];
      expect(typeof actual).toBe('function');
    }
  });

  // Snapshot to surface new exports in PR review. Update with
  // `npx vitest -u` when intentional.
  it('matches the recorded export partition', () => {
    expect(AEGIS_SDK_DEFINE_STUBBED_EXPORTS).toMatchSnapshot();
  });
});

import { AEGIS_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'aegis-shared/application';
import { isDefined } from 'aegis-shared/utils';

type ApplicationLike = {
  universalIdentifier?: string | null;
};

export const isAegisStandardApplication = (
  application: ApplicationLike | null | undefined,
): boolean =>
  isDefined(application?.universalIdentifier) &&
  application.universalIdentifier ===
    AEGIS_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER;

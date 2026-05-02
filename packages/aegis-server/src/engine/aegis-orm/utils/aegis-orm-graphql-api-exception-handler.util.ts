import { isDefined } from 'aegis-shared/utils';

import { UserInputError } from 'src/engine/core-modules/graphql/utils/graphql-errors.util';
import {
  type AegisORMException,
  AegisORMExceptionCode,
} from 'src/engine/aegis-orm/exceptions/aegis-orm.exception';

interface DuplicateKeyErrorWithMetadata extends AegisORMException {
  conflictingRecordId?: string;
  conflictingObjectNameSingular?: string;
}

export const aegisORMGraphqlApiExceptionHandler = (
  error: AegisORMException,
) => {
  switch (error.code) {
    case AegisORMExceptionCode.DUPLICATE_ENTRY_DETECTED: {
      const duplicateKeyError: DuplicateKeyErrorWithMetadata = error;

      const extensions: Record<string, unknown> = {
        userFriendlyMessage: error.userFriendlyMessage,
        ...(isDefined(duplicateKeyError.conflictingRecordId) &&
        isDefined(duplicateKeyError.conflictingObjectNameSingular)
          ? {
              conflictingRecordId: duplicateKeyError.conflictingRecordId,
              conflictingObjectNameSingular:
                duplicateKeyError.conflictingObjectNameSingular,
            }
          : {}),
      };

      throw new UserInputError(error.message, extensions);
    }

    case AegisORMExceptionCode.INVALID_INPUT:
    case AegisORMExceptionCode.CONNECT_RECORD_NOT_FOUND:
    case AegisORMExceptionCode.CONNECT_NOT_ALLOWED:
    case AegisORMExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR:
    case AegisORMExceptionCode.RLS_VALIDATION_FAILED:
    case AegisORMExceptionCode.TOO_MANY_RECORDS_TO_UPDATE:
      throw new UserInputError(error.message, {
        userFriendlyMessage: error.userFriendlyMessage,
      });
    default: {
      throw error;
    }
  }
};

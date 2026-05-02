import { msg } from '@lingui/core/macro';
import { isDefined } from 'aegis-shared/utils';
import { QueryFailedError } from 'typeorm';

import { type WorkspaceInternalContext } from 'src/engine/aegis-orm/interfaces/workspace-internal-context.interface';

import { POSTGRESQL_ERROR_CODES } from 'src/engine/api/graphql/workspace-query-runner/constants/postgres-error-codes.constants';
import { handleDuplicateKeyError } from 'src/engine/api/graphql/workspace-query-runner/utils/handle-duplicate-key-error.util';
import { PostgresException } from 'src/engine/api/graphql/workspace-query-runner/utils/postgres-exception';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type WorkspaceEntityManager } from 'src/engine/aegis-orm/entity-manager/workspace-entity-manager';
import {
  AegisORMException,
  AegisORMExceptionCode,
} from 'src/engine/aegis-orm/exceptions/aegis-orm.exception';

interface QueryFailedErrorWithCode extends QueryFailedError {
  code?: string;
}

export const computeAegisORMException = async (
  error: Error,
  objectMetadata?: FlatObjectMetadata,
  entityManager?: WorkspaceEntityManager,
  internalContext?: WorkspaceInternalContext,
): Promise<Error | AegisORMException> => {
  if (error instanceof QueryFailedError) {
    if (error.message.includes('Query read timeout')) {
      return new AegisORMException(
        'Query read timeout',
        AegisORMExceptionCode.QUERY_READ_TIMEOUT,
        {
          userFriendlyMessage: msg`We are experiencing a temporary issue with our database. Please try again later.`,
        },
      );
    }

    const errorCode = (error as QueryFailedErrorWithCode).code;

    if (
      errorCode === POSTGRESQL_ERROR_CODES.UNIQUE_VIOLATION &&
      isDefined(objectMetadata) &&
      isDefined(entityManager) &&
      isDefined(internalContext)
    ) {
      return await handleDuplicateKeyError(
        error,
        objectMetadata,
        internalContext,
        entityManager,
      );
    }

    if (errorCode === POSTGRESQL_ERROR_CODES.INVALID_TEXT_REPRESENTATION) {
      return new AegisORMException(
        error.message, // safe and useful
        AegisORMExceptionCode.INVALID_INPUT,
      );
    }

    if (
      isDefined(errorCode) &&
      Object.values(POSTGRESQL_ERROR_CODES).includes(errorCode)
    ) {
      throw new PostgresException('Data validation error.', errorCode);
    }
    throw error;
  }

  return error;
};

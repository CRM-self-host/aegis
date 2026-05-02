import { Injectable } from '@nestjs/common';

import { FileFolder } from 'aegis-shared/types';

import {
  FileTokenJwtPayload,
  JwtTokenTypeEnum,
} from 'src/engine/core-modules/auth/types/auth-context.type';
import { JwtWrapperService } from 'src/engine/core-modules/jwt/services/jwt-wrapper.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class FileUrlService {
  constructor(
    private readonly jwtWrapperService: JwtWrapperService,
    private readonly aegisConfigService: AegisConfigService,
  ) {}

  signFileByIdUrl({
    fileId,
    workspaceId,
    fileFolder,
  }: {
    fileId: string;
    workspaceId: string;
    fileFolder: FileFolder;
  }): string {
    const fileTokenExpiresIn = this.aegisConfigService.get(
      'FILE_TOKEN_EXPIRES_IN',
    );

    const payload: FileTokenJwtPayload = {
      workspaceId,
      fileId,
      sub: workspaceId,
      type: JwtTokenTypeEnum.FILE,
    };

    const secret = this.jwtWrapperService.generateAppSecret(
      payload.type,
      workspaceId,
    );

    const token = this.jwtWrapperService.sign(payload, {
      secret,
      expiresIn: fileTokenExpiresIn,
    });

    const serverUrl = this.aegisConfigService.get('SERVER_URL');

    return `${serverUrl}/file/${fileFolder}/${fileId}?token=${token}`;
  }
}

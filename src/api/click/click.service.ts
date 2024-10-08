import { Injectable } from '@nestjs/common';
import { SaveErrorLogDto } from './dto/save-error-log.dto';
import { ClickPrismaService } from '@/database/prisma/click-prisma.service';

@Injectable()
export class ClickService {
  constructor(private prisma: ClickPrismaService) { }

  saveErrorLog(dto: SaveErrorLogDto, ip: string | undefined) {
    return this.prisma.errorLog.create({
      data: {
        ykiho: dto.ykiho,
        computerName: dto.computerName,
        moduleName: dto.moduleName,
        logLevel: dto.logLevel,
        exceptionType: dto.exceptionType,
        errorMessage: dto.errorMessage,
        stackTrace: dto.stackTrace || null,
        source: dto.source || null,
        additionalData: { ...dto.additionalData, ip },
        clientVersion: dto.clientVersion,
      },
    });
  }
}

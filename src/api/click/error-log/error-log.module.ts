import { Module } from '@nestjs/common';
import { ErrorLogService } from './error-log.service';
import { ErrorLogController } from './error-log.controller';

@Module({
  controllers: [ErrorLogController],
  providers: [ErrorLogService],
})
export class ErrorLogModule {}

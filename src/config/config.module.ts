import { LoggerContextMiddleware } from '@/common/middlewares/logger-context.middleware';
import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './jwt.config';
import { EnvModule } from '@/modules/env/env.module';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true, }),
    JwtModule.registerAsync({ useClass: JwtConfig, global: true }),
    EnvModule,
  ],
  providers: [Logger],
})
export class ConfigModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}

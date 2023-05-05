import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import env from './config/env';
import { UsersModule } from './modules/user/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}

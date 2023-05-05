import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import env from './config/env';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filters';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import * as winston from 'winston';

async function bootstrap() {
  process.env.TZ = 'Asia/Shanghai';
  const logPrintFormat = (info) =>
    `[${[info.timestamp]}]:[${info.level}]:[msg--> ${
      info.message
    }]: [context--> ${
      info.context && typeof info.context !== 'string'
        ? JSON.stringify(info.context)
        : info.context
    }]`;
  const app = await NestFactory.create(AppModule, {
    // 使用Winston替换原始的日志模块
    logger: WinstonModule.createLogger({
      transports: [
        // 日志控制台打印配置
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.colorize({ all: true }),
            winston.format.printf(logPrintFormat),
          ),
        }),
        // 日志文件配置
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(logPrintFormat),
          ),
        }),
      ],
    }),
  });

  app.setGlobalPrefix(env.SERVICE_CONFIG.GLOBAL_PREFIX); //设置全局路由前缀
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(env.SERVICE_CONFIG.PORT);
}
bootstrap();

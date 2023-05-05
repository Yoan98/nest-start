import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getReqMainInfo } from '../utils/index.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse;
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message[0];
    }

    // 记录日志（错误消息，错误码，请求信息等）
    this.logger.error(message, {
      status,
      req: getReqMainInfo(request),
    });

    response.status(status).json({
      code: status,
      message: validatorMessage || message,
    });
  }
}

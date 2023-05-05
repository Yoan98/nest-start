import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { getReqMainInfo } from './utils/index.util';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(@Req() request: Request): string {
    this.logger.log('request', { req: getReqMainInfo(request) });
    return this.appService.getHello();
  }
}

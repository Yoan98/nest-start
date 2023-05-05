import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    const time = new Date().toLocaleString();
    this.logger.log(time);
    return 'Hello World ';
  }
}

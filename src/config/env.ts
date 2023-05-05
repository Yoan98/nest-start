import { getYamlConfig } from '../utils/index.util';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const ymlPath = join(process.cwd(), './env');

const config = getYamlConfig((process.env.NODE_ENV as ENV) || 'dev', ymlPath);

const { mysql } = config;

console.log('当前环境', process.env.NODE_ENV);
// 数据库配置
const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: mysql.host,
  port: mysql.port,
  username: mysql.username,
  password: mysql.password,
  database: mysql.database,
  autoLoadEntities: true, // 使用这个配置自动导入entities
  synchronize: false,
};

// 服务的一些配置
const SERVICE_CONFIG = {
  // 此处是容器内部的端口,如需修改，还需要修改devops文件以及线上服务器tengine配置
  PORT: 9000,
  GLOBAL_PREFIX: 'api/qiwei',
};
export default {
  DATABASE_CONFIG,
  SERVICE_CONFIG,
};

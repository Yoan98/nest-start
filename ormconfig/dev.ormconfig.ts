import { getYamlConfig } from '../src/utils/index.util';
import { join } from 'path';

const ymlPath = join(process.cwd(), './env');

const { mysql } = getYamlConfig('dev', ymlPath);

console.log('当前操作的数据库信息', mysql);
module.exports = {
  type: 'mysql',
  host: mysql.host,
  port: mysql.port,
  username: mysql.username,
  password: mysql.password,
  database: mysql.database,
  // 需要避免更新其他语言创建的表
  entities: ['src/modules/**/entity/*.ts'],
  migrations: ['migration/dev/*.ts'],
  cli: {
    migrationsDir: 'migration/dev',
  },
};

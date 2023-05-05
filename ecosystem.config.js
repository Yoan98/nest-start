// PM2配置文件，应用于测试与生产环境
module.exports = {
  apps: [
    {
      name: 'node-nest',
      script: './dist/main.js',
      env_dev: {
        NODE_ENV: 'dev',
      },
      env_test109: {
        NODE_ENV: 'test109',
      },
      env_test92: {
        NODE_ENV: 'test92',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
      instances: 1,
      exec_mode: 'cluster',
      out_file: '/dev/null',
      error_file: '/dev/null',
      watch: false,
    },
  ],
};

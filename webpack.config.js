/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');

module.exports = function (options) {
  return {
    ...options,
    externals: [],
    plugins: [
      new webpack.IgnorePlugin({
        checkResource(resource) {
          // 一些nest框架代码用到的库，但它本身的package又没有配置，所以直接打包会报错。这里需要忽略下；后期需要的话可在手动yarn
          const lazyImports = [
            '@nestjs/microservices',
            '@nestjs/microservices/microservices-module',
            '@nestjs/websockets/socket-module',
            'cache-manager',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
  };
};

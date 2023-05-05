ARG NODE_VERSION
FROM node:${NODE_VERSION}

RUN mkdir -p /app && \
  mkdir -p /opt/node/node_global && \
  mkdir -p /opt/node/node_cache && \
  yarn config set registry https://registry.npmmirror.com && \
  yarn config set prefix "/opt/node/node_global" && \
  yarn config set cache-folder "/opt/node/node_cache"

RUN yarn global add pm2@5.3.0

RUN ln -s /opt/node/node_global/bin/pm2 /usr/local/bin/pm2 && \
  ln -s /opt/node/node_global/bin/pm2-runtime /usr/local/bin/pm2-runtime

VOLUME ["/opt", "/app" ]
WORKDIR /app

CMD ["node"]
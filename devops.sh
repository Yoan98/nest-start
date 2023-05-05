#!/bin/bash
SERVICE_NAME='node-nest'
DOCKER_PATH='./nest-docker/docker-compose.yml'

ENV=$1

# 注入动态环境变量
export NODE_NEST_DOCKER_COMMAND="bash -c \"yarn && yarn run build && pm2-runtime start ecosystem.config.js --env ${ENV}\""

echo "####################current enviornment ${ENV}"

if [ -z "${ENV}" ]; then
  echo "#####################please input enviornment"
  exit 1
fi



nodeNestConId=$(docker ps -a --filter="name=${SERVICE_NAME}" -q | xargs)
if [ -n "${nodeNestConId}" ]; then
  #容器存在，则重启当前的容器
  echo "####################node-nest restart"
  docker-compose -f ${DOCKER_PATH} exec ${SERVICE_NAME} bash -c "yarn && yarn run build && pm2 restart ecosystem.config.js"
  else
  # 不存在，则创建容器
  echo "######################node-nest run up"

  docker-compose -f ${DOCKER_PATH} up -d ${SERVICE_NAME}
fi


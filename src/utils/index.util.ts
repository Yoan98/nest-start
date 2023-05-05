import { parse } from 'yaml';
import * as fs from 'fs';
import { join } from 'path';
import { Request } from 'express';
/**
 * 获取分页信息
 * @param total
 * @param pageSize
 * @param page
 * @returns
 */
export const getPagination = (
  total: number,
  pageSize: number,
  page: number,
) => {
  const pages = Math.ceil(total / pageSize);
  return {
    total: Number(total),
    page: Number(page),
    pageSize: Number(pageSize),
    pages: Number(pages),
  };
};

export const getYamlConfig = (env: ENV, path: string) => {
  const YAML_CONFIG_ENV = `env.${env || 'dev'}.yaml`;
  const yamFile = fs.readFileSync(join(path, YAML_CONFIG_ENV), 'utf8');
  const config = parse(yamFile);
  return config;
};

// 获取请求数据
export const getReqMainInfo: (req: Request) => {
  [prop: string]: any;
} = (req) => {
  const { query, headers, url, method, body, connection } = req;

  // 获取 IP
  const xRealIp = headers['X-Real-IP'];
  const xForwardedFor = headers['X-Forwarded-For'];
  const { ip: cIp } = req;
  const { remoteAddress } = connection || {};
  const ip = xRealIp || xForwardedFor || cIp || remoteAddress;

  return {
    url,
    host: headers.host,
    ip,
    method,
    query,
    body,
  };
};

import config from "./config";

export const Pipelines = ["TiDB", "TiKV", "TiFlash"];
export const FRONTHOST='http://127.0.0.1:3000';
export const CLIENTID='aee7050a0cf9f4bbd21e';
export const SECRET='1253a15d669dc7d76b52a5abf670894314615af3';

export function url(url) {
  return `${config.SERVER_HOST}${url}`;
}



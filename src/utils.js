import config from "./config";

export const Pipelines = ["TiDB", "TiKV", "TiFlash"];

export function url(url) {
  return `${config.SERVER_HOST}${url}`;
}



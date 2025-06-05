import {
  defaultConfig
} from "./chunk-QOZR7PL7.mjs";

// src/config/configManager.ts
var config = {
  ...defaultConfig
};
var getConfig = () => config;
var setConfig = (newConfig) => {
  config = { ...config, ...newConfig };
};

export {
  getConfig,
  setConfig
};

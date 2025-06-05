import { defaultConfig } from './defaultConfig';
import { HydraConfig } from './types';

let config: HydraConfig = {
  ...defaultConfig,
};

export const getConfig = (): HydraConfig => config;

export const setConfig = (newConfig: Partial<HydraConfig>) => {
  config = { ...config, ...newConfig };
};

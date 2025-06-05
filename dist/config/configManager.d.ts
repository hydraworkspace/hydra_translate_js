import { HydraConfig } from './types.js';

declare const getConfig: () => HydraConfig;
declare const setConfig: (newConfig: Partial<HydraConfig>) => void;

export { getConfig, setConfig };

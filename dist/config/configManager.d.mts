import { HydraConfig } from './types.mjs';

declare const getConfig: () => HydraConfig;
declare const setConfig: (newConfig: Partial<HydraConfig>) => void;

export { getConfig, setConfig };

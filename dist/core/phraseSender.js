"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/phraseSender.ts
var phraseSender_exports = {};
__export(phraseSender_exports, {
  sendPhrasesToServer: () => sendPhrasesToServer
});
module.exports = __toCommonJS(phraseSender_exports);

// src/config/defaultConfig.ts
var defaultConfig = {
  language: "en",
  defaultLanguage: "en",
  apiEndpoint: "https://api.example.com/translations"
};

// src/config/configManager.ts
var config = {
  ...defaultConfig
};
var getConfig = () => config;

// src/core/phraseSender.ts
async function sendPhrasesToServer(phrases) {
  const { apiEndpoint, projectId, token } = getConfig();
  const payload = {
    projectId,
    phrases
  };
  try {
    await fetch(`${apiEndpoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...token ? { "Authorization": `Bearer ${token}` } : {}
      },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    if (getConfig().debug) console.warn("Failed to send phrases", e);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendPhrasesToServer
});

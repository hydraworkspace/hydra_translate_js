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

// src/core/cache.ts
var cache_exports = {};
__export(cache_exports, {
  loadCachedPhrases: () => loadCachedPhrases,
  saveCachedPhrases: () => saveCachedPhrases
});
module.exports = __toCommonJS(cache_exports);

// src/config/constants.ts
var LOCAL_STORAGE_CACHE_KEY = "__hydra_cache__";

// src/core/cache.ts
function loadCachedPhrases() {
  const raw = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveCachedPhrases(phrases) {
  localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(phrases));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadCachedPhrases,
  saveCachedPhrases
});

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

// src/core/phraseRegistry.ts
var phraseRegistry_exports = {};
__export(phraseRegistry_exports, {
  registerPhrases: () => registerPhrases,
  resetRegistry: () => resetRegistry
});
module.exports = __toCommonJS(phraseRegistry_exports);
var seen = /* @__PURE__ */ new Set();
function registerPhrases(phrases) {
  const newOnes = phrases.filter((p) => !seen.has(p));
  newOnes.forEach((p) => seen.add(p));
  return newOnes;
}
function resetRegistry() {
  seen.clear();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerPhrases,
  resetRegistry
});

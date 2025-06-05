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

// src/core/domPhraseExtractor.ts
var domPhraseExtractor_exports = {};
__export(domPhraseExtractor_exports, {
  extractPhrases: () => extractPhrases
});
module.exports = __toCommonJS(domPhraseExtractor_exports);
function extractPhrases(root) {
  const phrases = [];
  const walk = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node;
      if (el.innerText?.trim()) phrases.push(el.innerText.trim());
      const attrs = ["placeholder", "alt", "title", "aria-label"];
      for (const attr of attrs) {
        const value = el.getAttribute(attr);
        if (value?.trim()) phrases.push(value.trim());
      }
    }
    for (const child of Array.from(node.childNodes)) {
      if (child instanceof HTMLElement) walk(child);
    }
  };
  walk(root);
  return phrases;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractPhrases
});

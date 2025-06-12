"use strict";
var HydraTranslate = (() => {
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

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    extractPhrasesFromDOM: () => extractPhrasesFromDOM,
    helloWorld: () => helloWorld,
    observeDOMChanges: () => observeDOMChanges
  });
  function helloWorld() {
    console.log(`Hydra hello world`);
  }
  var ATTRIBUTES = ["placeholder", "alt", "title", "aria-label"];
  function extractPhrasesFromDOM(root) {
    const phrases = /* @__PURE__ */ new Set();
    function traverse(node) {
      const text = node.textContent?.trim();
      if (text) phrases.add(text);
      ATTRIBUTES.forEach((attr) => {
        const value = node.getAttribute(attr);
        if (value) phrases.add(value.trim());
      });
      if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
        const value = node.value?.trim();
        if (value) phrases.add(value);
      }
      if (node instanceof HTMLSelectElement) {
        const selectedOption = node.options[node.selectedIndex];
        if (selectedOption) {
          const optionText = selectedOption.textContent?.trim();
          if (optionText) phrases.add(optionText);
        }
      }
      for (const child of Array.from(node.children)) {
        traverse(child);
      }
    }
    traverse(root);
    return phrases;
  }
  function observeDOMChanges(callback, root = document.body) {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const phrases = extractPhrasesFromDOM(node);
              callback(phrases);
            }
          });
        }
        if (mutation.type === "attributes" && mutation.target instanceof HTMLElement) {
          const phrases = extractPhrasesFromDOM(mutation.target);
          callback(phrases);
        }
        if (mutation.type === "characterData" && mutation.target.parentElement) {
          const phrases = extractPhrasesFromDOM(mutation.target.parentElement);
          callback(phrases);
        }
      }
    });
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTES
    });
  }
  return __toCommonJS(index_exports);
})();

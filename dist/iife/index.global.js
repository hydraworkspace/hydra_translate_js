"use strict";
var Hydra = (() => {
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
    Hydra: () => Hydra,
    PhraseCache: () => PhraseCache,
    PhraseScanner: () => PhraseScanner,
    default: () => index_default
  });

  // src/phrase-scanner.ts
  var ATTRIBUTES = ["placeholder", "alt", "title", "aria-label"];
  function isValidPhrase(value) {
    return !!(value == null ? void 0 : value.trim());
  }
  var PhraseScanner = class {
    constructor(attributes = ATTRIBUTES) {
      this.attributes = attributes;
    }
    /**
     * Quét toàn bộ DOM để lấy cụm từ
     */
    extractFromDOM(root = document.body) {
      const phrases = /* @__PURE__ */ new Set();
      this.traverse(root, phrases);
      return phrases;
    }
    /**
     * Theo dõi thay đổi DOM và tự động quét lại
     */
    observeDOMChanges(callback, root = document.body) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                const phrases = this.extractFromDOM(node);
                callback(phrases);
              }
            });
          }
          if (mutation.type === "attributes" && mutation.target instanceof HTMLElement) {
            const phrases = this.extractFromDOM(mutation.target);
            callback(phrases);
          }
          if (mutation.type === "characterData" && mutation.target.parentElement) {
            const phrases = this.extractFromDOM(mutation.target.parentElement);
            callback(phrases);
          }
        }
      });
      observer.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: this.attributes
      });
      return observer;
    }
    /**
     * Traverse DOM node đệ quy và thu thập cụm từ
     */
    traverse(node, phrases) {
      var _a, _b, _c;
      const text = (_a = node.textContent) == null ? void 0 : _a.trim();
      if (isValidPhrase(text)) phrases.add(text);
      this.attributes.forEach((attr) => {
        var _a2;
        const value = (_a2 = node.getAttribute(attr)) == null ? void 0 : _a2.trim();
        if (isValidPhrase(value)) {
          phrases.add(value);
        }
      });
      if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
        const value = (_b = node.value) == null ? void 0 : _b.trim();
        if (isValidPhrase(value)) phrases.add(value);
      }
      if (node instanceof HTMLSelectElement) {
        const selectedOption = node.options[node.selectedIndex];
        if (selectedOption) {
          const optionText = (_c = selectedOption.textContent) == null ? void 0 : _c.trim();
          if (isValidPhrase(optionText)) {
            phrases.add(optionText);
          }
        }
      }
      Array.from(node.children).forEach((child) => {
        this.traverse(child, phrases);
      });
    }
  };

  // src/phrase-cache.ts
  var STORAGE_KEY = "hydra:cachedPhrases";
  var PhraseCache = class {
    constructor() {
      const stored = localStorage.getItem(STORAGE_KEY);
      this.cache = stored ? new Set(JSON.parse(stored)) : /* @__PURE__ */ new Set();
    }
    has(phrase) {
      return this.cache.has(phrase);
    }
    add(phrase) {
      if (!this.cache.has(phrase)) {
        this.cache.add(phrase);
        this.save();
      }
    }
    addMany(phrases) {
      let updated = false;
      for (const phrase of phrases) {
        if (!this.cache.has(phrase)) {
          this.cache.add(phrase);
          updated = true;
        }
      }
      if (updated) this.save();
    }
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.cache)));
    }
    clear() {
      this.cache.clear();
      localStorage.removeItem(STORAGE_KEY);
    }
    getAll() {
      return Array.from(this.cache);
    }
  };
  var phraseCache = new PhraseCache();

  // src/index.ts
  var Hydra = {
    PhraseScanner,
    PhraseCache
  };
  var index_default = Hydra;
  return __toCommonJS(index_exports);
})();

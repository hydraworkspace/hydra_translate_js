"use strict";
(() => {
  // src/core/phraseRegistry.ts
  var seen = /* @__PURE__ */ new Set();
  function registerPhrases(phrases) {
    const newOnes = phrases.filter((p) => !seen.has(p));
    newOnes.forEach((p) => seen.add(p));
    return newOnes;
  }
  function resetRegistry() {
    seen.clear();
  }
})();

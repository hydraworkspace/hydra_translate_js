"use strict";
(() => {
  // src/core/domPhraseExtractor.ts
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

  // src/core/phraseRegistry.ts
  var seen = /* @__PURE__ */ new Set();
  function registerPhrases(phrases) {
    const newOnes = phrases.filter((p) => !seen.has(p));
    newOnes.forEach((p) => seen.add(p));
    return newOnes;
  }

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

  // src/core/index.ts
  async function scan(root = document.body) {
    const allPhrases = extractPhrases(root);
    const newPhrases = registerPhrases(allPhrases);
    if (newPhrases.length > 0) {
      console.log(`Found ${newPhrases.length} new phrases to send:`, newPhrases);
    }
  }
  async function send(phrases) {
    const { apiEndpoint, projectId, token, debug } = getConfig();
    if (!phrases.length || !apiEndpoint || !projectId) {
      if (debug) console.warn("Missing config or empty phrase list");
      return;
    }
    try {
      await fetch(`${apiEndpoint}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token ? { Authorization: `Bearer ${token}` } : {}
        },
        body: JSON.stringify({ projectId, phrases })
      });
    } catch (err) {
      if (debug) console.warn("Failed to send phrases:", err);
    }
  }
  var hello = () => console.log("Core!");
})();

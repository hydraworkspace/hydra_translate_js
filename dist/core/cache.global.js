"use strict";
(() => {
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
})();

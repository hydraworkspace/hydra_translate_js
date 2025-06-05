import {
  LOCAL_STORAGE_CACHE_KEY
} from "../chunk-K2HAZIZO.mjs";

// src/core/cache.ts
function loadCachedPhrases() {
  const raw = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveCachedPhrases(phrases) {
  localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(phrases));
}
export {
  loadCachedPhrases,
  saveCachedPhrases
};

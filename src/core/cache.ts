// Cache cụm từ đã gửi
import { LOCAL_STORAGE_CACHE_KEY } from '../config/constants';

export function loadCachedPhrases(): string[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCachedPhrases(phrases: string[]) {
  localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(phrases));
}

const STORAGE_KEY = 'hydra:cachedPhrases';

export class PhraseCache {
  private cache: Set<string>;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.cache = stored ? new Set(JSON.parse(stored)) : new Set();
  }

  has(phrase: string): boolean {
    return this.cache.has(phrase);
  }

  add(phrase: string): void {
    if (!this.cache.has(phrase)) {
      this.cache.add(phrase);
      this.save();
    }
  }

  addMany(phrases: Iterable<string>): void {
    let updated = false;
    for (const phrase of phrases) {
      if (!this.cache.has(phrase)) {
        this.cache.add(phrase);
        updated = true;
      }
    }
    if (updated) this.save();
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.cache)));
  }

  clear(): void {
    this.cache.clear();
    localStorage.removeItem(STORAGE_KEY);
  }

  getAll(): string[] {
    return Array.from(this.cache);
  }
}

export const phraseCache = new PhraseCache();

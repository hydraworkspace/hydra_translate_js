// Quản lý cụm từ đã quét & tránh trùng

const seen = new Set<string>();

export function registerPhrases(phrases: string[]): string[] {
  const newOnes = phrases.filter(p => !seen.has(p));
  newOnes.forEach(p => seen.add(p));
  return newOnes;
}

export function resetRegistry() {
  seen.clear();
}

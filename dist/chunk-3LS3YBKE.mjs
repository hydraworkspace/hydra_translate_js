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

export {
  extractPhrases
};

// Quét và trích cụm từ từ DOM

export function extractPhrases(root: HTMLElement): string[] {
  const phrases: string[] = [];

  const walk = (node: HTMLElement) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;

      // Inner text
      if (el.innerText?.trim()) phrases.push(el.innerText.trim());

      // Attributes to extract
      const attrs = ['placeholder', 'alt', 'title', 'aria-label'];
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

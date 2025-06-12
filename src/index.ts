export function helloWorld(): void {
  console.log(`Hydra hello world`);
}

const ATTRIBUTES = ['placeholder', 'alt', 'title', 'aria-label'];

/**
 * @param root 
 * @returns 
 */
export function extractPhrasesFromDOM(root: HTMLElement): Set<string> {
  const phrases: Set<string> = new Set();

  function traverse(node: HTMLElement) {
    const text = node.textContent?.trim();
    if (text) phrases.add(text);

    ATTRIBUTES.forEach(attr => {
      const value = node.getAttribute(attr);
      if (value) phrases.add(value.trim());
    });

    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      const value = node.value?.trim();
      if (value) phrases.add(value);
    }

    if (node instanceof HTMLSelectElement) {
      const selectedOption = node.options[node.selectedIndex];
      if (selectedOption) {
        const optionText = selectedOption.textContent?.trim();
        if (optionText) phrases.add(optionText);
      }
    }

    for (const child of Array.from(node.children)) {
      traverse(child as HTMLElement);
    }
  }

  traverse(root);
  return phrases;
}

/**
 * @param callback 
 * @param root 
 */
export function observeDOMChanges(callback: (phrases: Set<string>) => void, root: HTMLElement = document.body) {
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            const phrases = extractPhrasesFromDOM(node);
            callback(phrases);
          }
        });
      }

      if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
        const phrases = extractPhrasesFromDOM(mutation.target);
        callback(phrases);
      }

      if (mutation.type === 'characterData' && mutation.target.parentElement) {
        const phrases = extractPhrasesFromDOM(mutation.target.parentElement);
        callback(phrases);
      }
    }
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRIBUTES
  });
}


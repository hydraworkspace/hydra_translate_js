const ATTRIBUTES = ['placeholder', 'alt', 'title', 'aria-label'];

function isValidPhrase(value: string | null | undefined): value is string {
  return !!value?.trim();
}

export class PhraseScanner {
  private readonly attributes: string[];

  constructor(attributes: string[] = ATTRIBUTES) {
    this.attributes = attributes;
  }

  /**
   * Quét toàn bộ DOM để lấy cụm từ
   */
  public extractFromDOM(root: HTMLElement = document.body): Set<string> {
    const phrases = new Set<string>();
    this.traverse(root, phrases);
    return phrases;
  }

  /**
   * Theo dõi thay đổi DOM và tự động quét lại
   */
  public observeDOMChanges(
    callback: (phrases: Set<string>) => void,
    root: HTMLElement = document.body
  ): MutationObserver {
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const phrases = this.extractFromDOM(node);
              callback(phrases);
            }
          });
        }

        if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
          const phrases = this.extractFromDOM(mutation.target);
          callback(phrases);
        }

        if (mutation.type === 'characterData' && mutation.target.parentElement) {
          const phrases = this.extractFromDOM(mutation.target.parentElement);
          callback(phrases);
        }
      }
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: this.attributes,
    });

    return observer;
  }

  /**
   * Traverse DOM node đệ quy và thu thập cụm từ
   */
  private traverse(node: HTMLElement, phrases: Set<string>) {
    const text = node.textContent?.trim();
    if (isValidPhrase(text)) phrases.add(text);

    this.attributes.forEach(attr => {
      const value = node.getAttribute(attr)?.trim();
      if (isValidPhrase(value)) {
        phrases.add(value);
      }
    });

    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      const value = node.value?.trim();
      if (isValidPhrase(value)) phrases.add(value);
    }

    if (node instanceof HTMLSelectElement) {
      const selectedOption = node.options[node.selectedIndex];
      if (selectedOption) {
        const optionText = selectedOption.textContent?.trim();
        if (isValidPhrase(optionText)) {
          phrases.add(optionText);
        }
      }
    }

    Array.from(node.children).forEach(child => {
      this.traverse(child as HTMLElement, phrases);
    });
  }
}

function isValidPhrase(value: string | null | undefined): value is string {
  return !!value?.trim();
}

export class PhraseScanner {
  static DEFAULT_ATTRIBUTES = [
    'placeholder',
    'alt',
    'title',
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-placeholder',
    'aria-valuetext',
  ];
  private readonly attributes: string[];

  constructor(attributes: string[] = PhraseScanner.DEFAULT_ATTRIBUTES) {
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
    if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) {
      return;
    }

    // 1. Quét các attribute
    this.attributes.forEach(attr => {
      const value = node.getAttribute(attr)?.trim();
      if (isValidPhrase(value)) {
        phrases.add(value);
        console.log(attr, value);
      }
    });

    // 2. Quét giá trị input/select
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      const value = node.value?.trim();
      if (isValidPhrase(value)) {
        phrases.add(value);
        console.log('input', value);
      }
    }

    if (node instanceof HTMLSelectElement) {
      Array.from(node.options).forEach(option => {
        const optionText = option.textContent?.trim();
        if (isValidPhrase(optionText)) {
          phrases.add(optionText);
          console.log('option', optionText);
        }
      });
    }

    // 3. Duyệt các node con (text hoặc element)
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim();
        if (isValidPhrase(text)) {
          phrases.add(text);
          console.log('text', text)
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        this.traverse(child as HTMLElement, phrases);
      }
    });
  }

}

declare class PhraseScanner {
    private readonly attributes;
    constructor(attributes?: string[]);
    /**
     * Quét toàn bộ DOM để lấy cụm từ
     */
    extractFromDOM(root?: HTMLElement): Set<string>;
    /**
     * Theo dõi thay đổi DOM và tự động quét lại
     */
    observeDOMChanges(callback: (phrases: Set<string>) => void, root?: HTMLElement): MutationObserver;
    /**
     * Traverse DOM node đệ quy và thu thập cụm từ
     */
    private traverse;
}

declare class PhraseCache {
    private cache;
    constructor();
    has(phrase: string): boolean;
    add(phrase: string): void;
    addMany(phrases: Iterable<string>): void;
    private save;
    clear(): void;
    getAll(): string[];
}

declare const Hydra: {
    PhraseScanner: typeof PhraseScanner;
    PhraseCache: typeof PhraseCache;
};

export { Hydra, PhraseCache, PhraseScanner, Hydra as default };

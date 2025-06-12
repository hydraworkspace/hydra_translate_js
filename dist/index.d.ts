declare function helloWorld(): void;
declare function extractPhrasesFromDOM(root: HTMLElement): Set<string>;
declare function observeDOMChanges(callback: (phrases: Set<string>) => void, root?: HTMLElement): void;

export { extractPhrasesFromDOM, helloWorld, observeDOMChanges };

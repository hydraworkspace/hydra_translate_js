declare function scan(root?: HTMLElement): Promise<void>;
declare function send(phrases: string[]): Promise<void>;
declare const hello: () => void;

export { hello, scan, send };

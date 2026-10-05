// localStorage に保存するときのキー（名前）

const STORAGE_PREFIX = 'pizza-order';

export const storageKey = (name: string) => `${STORAGE_PREFIX}:${name}`;

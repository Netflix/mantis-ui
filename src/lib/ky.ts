import type { Hooks } from 'ky';
import ky from 'ky';

export function createKyInstance(prefixUrl: string, hooks: Hooks) {
  const instance = ky.create({
    prefixUrl,
    hooks,
  });

  return instance;
}

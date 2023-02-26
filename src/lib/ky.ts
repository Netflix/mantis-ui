import ky, { Hooks } from 'ky';

export function createKyInstance(prefixUrl: string, hooks: Hooks) {
  const instance = ky.create({
    prefixUrl,
    hooks,
  });

  return instance;
}

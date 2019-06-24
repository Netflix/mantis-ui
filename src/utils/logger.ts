const isDevMode = import.meta.env.MODE === 'development';

export function logErrorMessage(message: string) {
  if (isDevMode) {
    /* eslint-disable no-console */
    console.error(message);
  }
}

import { Config } from 'tailwindcss/types/config';

declare module 'tailwind.config' {
  const config: Config;
  export = config;
}

declare module "dotenv" {
  export function config(options?: { path?: string; encoding?: string; debug?: boolean; override?: boolean }): void;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_TRANSLATE_API_KEY: string;
      [key: string]: string | undefined;
    }
  }
}

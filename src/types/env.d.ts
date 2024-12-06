declare module "dotenv" {
  export function config(options?: { path?: string; encoding?: string; debug?: boolean; override?: boolean }): void;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_TRANSLATE_API_KEY: string;
      DATABASE_URL: string;
      DATABASE_URL_UNPOOLED: string;
      [key: string]: string | undefined;
    }
  }
}

export {};

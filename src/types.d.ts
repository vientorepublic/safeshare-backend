declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_HOST: string;
      USE_CLUSTER: string;
      UPLOAD_PATH: string;
      RECAPTCHA_SECRET: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      SIZE_LIMIT: string;
      EXPIRES: string;
    }
  }
}

export interface ICaptchaResponse {
  success: boolean;
  challenge_ts: string;
}

export interface ICaptchaData {
  success: boolean;
  challenge_ts: string;
}

import Env from "./env";

export const BASE_URL = `${Env.BACKEND_APP_URL}/api`;

export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const CHECK_CREDENTIALS_URL = `${BASE_URL}/auth/check-credentials`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;

export const BATTLE_URL = `${BASE_URL}/battle`
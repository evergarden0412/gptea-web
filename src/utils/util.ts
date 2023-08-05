import { decode } from "jsonwebtoken";

export const GPTEA_ACCESS_TOKEN = "gptea_access_token";
export const GPTEA_REFRESH_TOKEN = "gptea_refresh_token";
export const GPTEA_EXPIRES_IN = "gptea_expires_in";

export const setGpteaTokenInStorage = (accessToken: string, refreshToken: string) => {
  const decoded = decode(accessToken) as { exp: number };

  localStorage.setItem(GPTEA_ACCESS_TOKEN, accessToken);
  localStorage.setItem(GPTEA_REFRESH_TOKEN, refreshToken);
  localStorage.setItem(GPTEA_EXPIRES_IN, JSON.stringify(decoded.exp));
};

export const removeGpteaTokenInStorage = () => {
  localStorage.removeItem(GPTEA_ACCESS_TOKEN);
  localStorage.removeItem(GPTEA_REFRESH_TOKEN);
  localStorage.removeItem(GPTEA_EXPIRES_IN);
};

export const GPTEA_ACCESS_TOKEN = "gptea_access_token";
export const GPTEA_REFRESH_TOKEN = "gptea_refresh_token";

export const setGpteaTokenInStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(GPTEA_ACCESS_TOKEN, accessToken);
  localStorage.setItem(GPTEA_REFRESH_TOKEN, refreshToken);
};

export const removeGpteaTokenInStorage = () => {
  localStorage.removeItem(GPTEA_ACCESS_TOKEN);
  localStorage.removeItem(GPTEA_REFRESH_TOKEN);
};

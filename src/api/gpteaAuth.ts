import { GPTEA_ACCESS_TOKEN, GPTEA_REFRESH_TOKEN } from "../utils/util";
import { api, apiWithAuth } from "./axiosApi";

export const createGpteaAccount = async (socialAccessToken: string, social: string) => {
  const data = { accessToken: socialAccessToken, cred: social };
  await api.post("/auth/cred/register", data);
};

export const createGpteaToken = async (socialAccessToken: string, social: string) => {
  const data = { accessToken: socialAccessToken, cred: social };
  const { data: result } = await api.post("/auth/cred/sign-in", data);

  return result;
};

export const recreateGpteaToken = async () => {
  const { data } = await api.post("/auth/token/refresh", null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      "x-refresh-token": `${localStorage.getItem(GPTEA_REFRESH_TOKEN)}`,
    },
  });

  return data;
};

export const deleteGpteaAccount = async () => {
  await apiWithAuth.delete("/me");
};

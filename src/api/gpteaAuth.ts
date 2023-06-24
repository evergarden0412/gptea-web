import axios from "axios";
import { GPTEA_ACCESS_TOKEN, GPTEA_REFRESH_TOKEN } from "../utils/util";

export const createGpteaAccount = async (accessToken: string, social: string) => {
  await axios("/auth/cred/register", { method: "POST", data: { accessToken, cred: social } });
};

export const createGpteaToken = async (socialAccessToken: string, social: string) => {
  const { data } = await axios("/auth/cred/sign-in", {
    method: "POST",
    data: { accessToken: socialAccessToken, cred: social },
  });
  return data;
};

export const verifyGpteaToken = async () => {
  const { data } = await axios("/auth/token/verify", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
  return data;
};

export const recreateGpteaToken = async () => {
  const { data } = await axios("/auth/token/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      "x-refresh-token": `${localStorage.getItem(GPTEA_REFRESH_TOKEN)}`,
    },
  });
  return data;
};

export const deleteGpteaAccount = async () => {
  await axios({
    url: "/me",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
};

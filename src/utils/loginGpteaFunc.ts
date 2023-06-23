import axios from "axios";

import { ERROR_GET_GPTEA_TOKENS, ERROR_REGISTER_IN_GPTEA, ERROR_VERIFY_GPTEA_TOKENS } from "./errorMessage";
import { KAKAO_ACCESS_TOKEN } from "../pages/KakaoLogin";
import { removeKakaoToken, removeNaverToken } from "./logoutFunc";
import { NAVER_ACCESS_TOKEN } from "../pages/NaverLogin";
import { toastFailToRegister, toastRegister } from "./toasts";

export const GPTEA_ACCESS_TOKEN = "gptea_access_token";
export const GPTEA_REFRESH_TOKEN = "gptea_refresh_token";

const registerInGptea = (accessToken: string, social: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios("/auth/cred/register", { method: "POST", data: { accessToken, cred: social } })
      .then(() => {
        console.log("registered.");
        toastRegister();
        resolve();
      })
      .catch((error) => {
        console.log({ ERROR_REGISTER_IN_GPTEA, error });
        toastFailToRegister();
        reject();
      });
  });
};

export const getGpteaToken = (accessToken: string, social: string): Promise<void | string> => {
  return new Promise((resolve, reject) => {
    axios("/auth/cred/sign-in", { method: "POST", data: { accessToken, cred: social } })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        localStorage.setItem(GPTEA_ACCESS_TOKEN, accessToken);
        localStorage.setItem(GPTEA_REFRESH_TOKEN, refreshToken);
        console.log("tokens generated.");

        if (localStorage.getItem(KAKAO_ACCESS_TOKEN)) removeKakaoToken();
        if (localStorage.getItem(NAVER_ACCESS_TOKEN)) removeNaverToken();
        resolve();
        // setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log({ ERROR_GET_GPTEA_TOKENS, err });
        registerInGptea(accessToken, social)
          .then(() => {
            getGpteaToken(accessToken, social).then(() => resolve());
          })
          .catch(() => reject(ERROR_GET_GPTEA_TOKENS));
      });
  });
};

export interface IDecode {
  exp: string;
  iat: string;
  jti: string;
  sub: string;
}

export const verifyGpteaToken = (): Promise<IDecode> => {
  return new Promise((resolve, reject) => {
    axios("/auth/token/verify", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    })
      .then((res) => {
        console.log("verified.");
        resolve(res.data);
      })
      .catch(() => {
        reject(ERROR_VERIFY_GPTEA_TOKENS);
      });
  });
};

export const refreshGpteaToken = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios("/auth/token/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
        "x-refresh-token": `${localStorage.getItem(GPTEA_REFRESH_TOKEN)}`,
      },
    })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        localStorage.setItem(GPTEA_ACCESS_TOKEN, accessToken);
        localStorage.setItem(GPTEA_REFRESH_TOKEN, refreshToken);
        console.log("tokens refreshed.");
        resolve(res.data);
      })
      .catch((err) => {
        reject(ERROR_VERIFY_GPTEA_TOKENS);
      });
  });
};

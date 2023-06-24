import axios from "axios";

import { NAVER_ACCESS_TOKEN } from "../pages/NaverLogin";
import { KAKAO_ACCESS_TOKEN, KAKAO_USER_ID } from "../pages/KakaoLogin";
import { GPTEA_ACCESS_TOKEN, GPTEA_REFRESH_TOKEN } from "./loginGpteaFunc";
import { toastLogout } from "./toasts";

export const removeNaverToken = () => {
  axios(
    `/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_NAVER_SECRET_KEY}
      &access_token=${localStorage.getItem(NAVER_ACCESS_TOKEN)}
      &service_provider=NAVER`
  )
    .then(() => {
      localStorage.removeItem(NAVER_ACCESS_TOKEN);
    })
    .catch((err) => console.log("eee", err));
};

export const removeKakaoToken = () => {
  axios("https://kapi.kakao.com/v1/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${localStorage.getItem(KAKAO_ACCESS_TOKEN)}`,
    },
  })
    .then(() => {
      localStorage.removeItem(KAKAO_USER_ID);
      localStorage.removeItem(KAKAO_ACCESS_TOKEN);
    })
    .catch((err) => console.log("error!", err));
};

export const removeSocialToken = () => {
  if (localStorage.getItem(NAVER_ACCESS_TOKEN)) {
    removeNaverToken();
  } else if (localStorage.getItem(KAKAO_ACCESS_TOKEN)) {
    removeKakaoToken();
  }
};

export const removeGpteaTokenInStorage = () => {
  localStorage.removeItem(GPTEA_ACCESS_TOKEN);
  localStorage.removeItem(GPTEA_REFRESH_TOKEN);
};

export const logoutGptea = () => {
  removeGpteaTokenInStorage();
  toastLogout();
};

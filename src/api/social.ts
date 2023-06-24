import axios from "axios";

/* KAKAO */

import { KAKAO_ACCESS_TOKEN, KAKAO_USER_ID } from "../pages/KakaoLogin";

export const unlinkKakaoAccount = async () => {
  await axios({
    url: `https://kapi.kakao.com/v1/user/unlink?target_id_type=user_id&target_id=${JSON.parse(
      localStorage.getItem(KAKAO_USER_ID) || ""
    )}`,
    method: "POST",
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const removeKakaoToken = async () => {
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

/* NAVER */

import { NAVER_ACCESS_TOKEN } from "../pages/NaverLogin";

export const removeNaverToken = async () => {
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

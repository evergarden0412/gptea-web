import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/isLoggedInSlice";
import { createGpteaAccount, createGpteaToken } from "../api/gpteaAuth";
import { getKakaoAccessToken, removeNaverToken } from "../api/social";
import { setGpteaTokenInStorage } from "../utils/util";
import { toastFailToRegister, toastLogin, toastRegister } from "../utils/toasts";
import { NAVER_ACCESS_TOKEN } from "./NaverLogin";
import { kakaoLogin } from "./Login";

const KAKAO = "kakao";

const removeSocialToken = async () => {
  if (localStorage.getItem(NAVER_ACCESS_TOKEN)) {
    removeNaverToken();
  } else if (kakaoLogin.Auth.getAccessToken()) {
    kakaoLogin.Auth.logout().catch((err: any) => console.log(err));
  }
};

export const generateGpteaToken = async (socialAccessToken: string, social: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    createGpteaToken(socialAccessToken, social)
      .then(async (res) => {
        const { accessToken, refreshToken } = res;
        setGpteaTokenInStorage(accessToken, refreshToken);
        await removeSocialToken();
        toastLogin();
        resolve();
      })
      .catch(() => {
        // GPTea 계정 없을 때의 error로 별도 분기 예정
        createGpteaAccount(socialAccessToken, social).then(
          () => {
            toastRegister();
            generateGpteaToken(socialAccessToken, social).then(() => resolve());
          },
          () => {
            toastFailToRegister();
            reject();
          }
        );
      });
  });
};

export default function KakaoLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code)
      getKakaoAccessToken(code)
        .then((kakaoAccessToken) => generateGpteaToken(kakaoAccessToken, KAKAO))
        .then(() => {
          dispatch(login());
          navigate("/");
        })
        .catch((err) => console.log(err));
  }, []);

  return <></>;
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/isLoggedInSlice";
import { createGpteaAccount, createGpteaToken } from "../api/gpteaAuth";
import { getKakaoAccessToken } from "../api/social";
import { setGpteaTokenInStorage } from "../utils/util";
import { toastFailToRegister, toastLogin, toastRegister } from "../utils/toasts";

const KAKAO = "kakao";

export const generateGpteaToken = async (socialAccessToken: string, social: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    createGpteaToken(socialAccessToken, social)
      .then((res) => {
        const { accessToken, refreshToken } = res;
        setGpteaTokenInStorage(accessToken, refreshToken);
        toastLogin();
        resolve();
      })
      .catch(() => {
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

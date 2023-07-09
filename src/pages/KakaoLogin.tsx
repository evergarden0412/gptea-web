import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decode } from "jsonwebtoken";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/isLoggedInSlice";
import { createGpteaAccount, createGpteaToken, verifyGpteaToken } from "../api/gpteaAuth";
import { setGpteaTokenInStorage } from "../utils/util";
import { toastFailToRegister, toastLogin, toastRegister } from "../utils/toasts";

const KAKAO = "kakao";
export const KAKAO_ACCESS_TOKEN = "kakao_access_token";
export const KAKAO_USER_ID = "kakao_user_id";

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

function KakaoLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const parameterForTokenRequest: any = {
        grant_type: "authorization_code",
        client_id: `${process.env.REACT_APP_KAKAO_API_KEY}`,
        redirect_uri: `${process.env.REACT_APP_KAKAO_CALLBACK_URL}`,
        code: code,
        client_secret: `${process.env.REACT_APP_KAKAO_SECRET_KEY}`,
      };

      const queryString = Object.keys(parameterForTokenRequest)
        .map((param: any) => encodeURIComponent(param) + "=" + encodeURIComponent(parameterForTokenRequest[param]))
        .join("&");

      axios(`https://kauth.kakao.com/oauth/token?${queryString}`, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then((res) => {
          const { access_token: accessToken, id_token: idToken } = res.data;
          if (accessToken) {
            const decoded = decode(idToken); // 사용자 카카오 ID
            localStorage.setItem(KAKAO_ACCESS_TOKEN, accessToken);
            localStorage.setItem(KAKAO_USER_ID, JSON.stringify(decoded?.sub));
            resolve(accessToken);
          }
        })
        .catch((err) => reject({ err }));
    });
  };

  useEffect(() => {
    if (code)
      getKakaoAccessToken()
        .then((kakaoAccessToken) => generateGpteaToken(kakaoAccessToken, KAKAO))
        .then(() => verifyGpteaToken())
        .then(() => {
          dispatch(login());
          navigate("/");
        })
        .catch((err) => console.log(err));
  }, []);

  return <></>;
}

export default KakaoLogin;

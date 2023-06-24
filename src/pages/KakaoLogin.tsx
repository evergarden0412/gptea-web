import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGpteaToken, verifyGpteaToken } from "../utils/loginGpteaFunc";
import { ERROR_GET_KAKAO_TOKENS } from "../utils/errorMessage";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/isLoggedInSlice";
import { toastLogin } from "../utils/toasts";
import { decode } from "jsonwebtoken";

const KAKAO = "kakao";
export const KAKAO_ACCESS_TOKEN = "kakao_access_token";
export const KAKAO_USER_ID = "kakao_user_id";

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
        .catch((err) => reject({ ERROR_GET_KAKAO_TOKENS, err }));
    });
  };

  useEffect(() => {
    if (code)
      getKakaoAccessToken()
        .then((kakaoAccessToken) => getGpteaToken(kakaoAccessToken, KAKAO))
        .then(() => verifyGpteaToken())
        .then(() => {
          toastLogin();
          dispatch(login());
          navigate("/");
        })
        .catch((err) => alert(err));
  }, []);

  return <></>;
}

export default KakaoLogin;

import axios from "axios";
import { kakaoLogin } from "../pages/Login";
import { NAVER_ACCESS_TOKEN } from "../pages/NaverLogin";

/* KAKAO */
type IParamsForTokenRequest = {
  [param: string]: string;
};

export const getKakaoAccessToken = (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const paramsForTokenRequest: IParamsForTokenRequest = {
      grant_type: "authorization_code",
      client_id: `${process.env.REACT_APP_KAKAO_API_KEY}`,
      redirect_uri: `${process.env.REACT_APP_KAKAO_CALLBACK_URL}`,
      code,
      client_secret: `${process.env.REACT_APP_KAKAO_SECRET_KEY}`,
    };

    const queryString = Object.keys(paramsForTokenRequest)
      .map((param) => encodeURIComponent(param) + "=" + encodeURIComponent(paramsForTokenRequest[param]))
      .join("&");

    axios(`https://kauth.kakao.com/oauth/token?${queryString}`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => {
        const { access_token: accessToken } = res.data;
        if (accessToken) {
          kakaoLogin.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
          kakaoLogin.Auth.setAccessToken(accessToken);
          resolve(accessToken);
        }
      })
      .catch((err) => reject({ err }));
  });
};

/* NAVER */

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

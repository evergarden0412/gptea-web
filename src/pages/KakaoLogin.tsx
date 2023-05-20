import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getGpteaToken, refreshGpteaToken, verifyGpteaToken } from '../utils/loginGpteaFunc';
import { ERROR_GET_KAKAO_TOKENS } from '../utils/errorMessage';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/isLoggedInSlice';

const KAKAO = 'kakao';
export const KAKAO_ACCESS_TOKEN = 'kakao_access_token';

function KakaoLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const code = new URL(window.location.href).searchParams.get('code');

  const getKakaoAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const parameterForTokenRequest: any = {
        grant_type: 'authorization_code',
        client_id: `${process.env.REACT_APP_KAKAO_API_KEY}`,
        redirect_uri: `${process.env.REACT_APP_KAKAO_CALLBACK_URL}`,
        code: code,
        client_secret: `${process.env.REACT_APP_KAKAO_SECRET_KEY}`,
      };

      const queryString = Object.keys(parameterForTokenRequest)
        .map((param: any) => encodeURIComponent(param) + '=' + encodeURIComponent(parameterForTokenRequest[param]))
        .join('&');

      axios(`https://kauth.kakao.com/oauth/token?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
        .then((res) => {
          const { access_token: accessToken } = res.data;
          if (accessToken) {
            localStorage.setItem(KAKAO_ACCESS_TOKEN, accessToken);
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
        .then((decoded) => {
          const now = Date.now() / 1000;
          const expire = new Date(decoded.exp).getTime() / 1000;
          // 만료가 60초 이내 남으면
          if (expire - now < 60) {
            return refreshGpteaToken();
          }
        })
        .then(() => {
          alert('Gptea logged in!');
          dispatch(login());
          navigate('/');
        })
        .catch((err) => alert(err));
  }, []);

  return <></>;
}

export default KakaoLogin;

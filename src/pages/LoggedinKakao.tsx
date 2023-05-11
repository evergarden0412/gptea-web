import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGpteaToken } from './loginGptea';
import { ERROR_GET_KAKAO_TOKENS } from '../errors';
import axios from 'axios';

const KAKAO = 'kakao';
export const KAKAO_ACCESS_TOKEN = 'kakao_access_token';

function LoggedinKakao({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

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
        .then(() => {
          alert('Gptea logged in!');
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => alert(err));
  }, []);

  return <></>;
}

export default LoggedinKakao;

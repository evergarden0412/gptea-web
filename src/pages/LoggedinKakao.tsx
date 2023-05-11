import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGpteaToken } from './loginGptea';
import { ERROR_GET_KAKAO_TOKENS } from '../errors';

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

      fetch(`https://kauth.kakao.com/oauth/token?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else throw new Error(ERROR_GET_KAKAO_TOKENS);
        })
        .then((json) => {
          if (json.access_token) {
            localStorage.setItem(KAKAO_ACCESS_TOKEN, json.access_token);
            resolve(json.access_token);
          }
        })
        .catch((error) => reject(error));
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
        .catch((error) => alert(error));
  }, []);

  return <></>;
}

export default LoggedinKakao;

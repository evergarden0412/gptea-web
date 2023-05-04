import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoggedinKakao({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  const getAccessToken = () => {
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
      .then((response) => response.json())
      .then((json) => {
        if (json.access_token) {
          localStorage.setItem('kakao_access', json.access_token);
          setIsLoggedIn(true);
          navigate('/');
        }
      });
  };

  useEffect(() => {
    if (code) getAccessToken();
  }, []);

  return <></>;
}

export default LoggedinKakao;

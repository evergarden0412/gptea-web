import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGpteaToken } from './loginGptea';

const NAVER = 'naver';
export const NAVER_ACCESS_TOKEN = 'naver_access_token';

function LoggedinNaver({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const naverAccessToken = window.location.href.split('=')[1].split('&')[0];

  useEffect(() => {
    if (naverAccessToken) {
      // gptea login api에 전달 예정
      if (!localStorage.getItem(NAVER_ACCESS_TOKEN)) localStorage.setItem(NAVER_ACCESS_TOKEN, naverAccessToken);
      getGpteaToken(naverAccessToken, NAVER)
        .then(() => {
          alert('Gptea logged in!');
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((error) => alert(error));
    }
  }, []);

  return <></>;
}

export default LoggedinNaver;

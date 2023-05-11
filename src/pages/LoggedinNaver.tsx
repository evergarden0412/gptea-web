import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoggedinNaver({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const access_token = window.location.href.split('=')[1].split('&')[0];

  useEffect(() => {
    if (access_token) {
      // gptea login api에 전달 예정
      if (!localStorage.getItem('naver_access')) localStorage.setItem('naver_access', access_token);
      setIsLoggedIn(true);
    }
    navigate('/');
  }, []);

  return <></>;
}

export default LoggedinNaver;

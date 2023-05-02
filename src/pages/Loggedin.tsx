import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Loggedin({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.includes('access_token')) {
      // gptea login api에 전달 예정
      if (!localStorage.getItem('access')) localStorage.setItem('access', JSON.stringify(window.location.href.split('=')[1].split('&')[0]));
      setIsLoggedIn(true);
    }
    navigate('/');
  }, []);

  return <></>;
}

export default Loggedin;

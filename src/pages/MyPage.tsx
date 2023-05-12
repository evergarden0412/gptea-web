import axios from 'axios';
import { GPTEA_ACCESS_TOKEN } from './loginGptea';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './logoutFunc';

function MyPage({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const handleUnregister = () => {
    axios
      .delete('/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
        },
      })
      .then(() => {
        alert('unregisterd!');
        handleLogout();
        setIsLoggedIn(false); // props drilling
        navigate('/');
      })
      .catch((error) => alert(error));
  };
  return <button onClick={handleUnregister}>회원탈퇴</button>;
}

export default MyPage;

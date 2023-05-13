import axios from 'axios';
import { GPTEA_ACCESS_TOKEN } from './loginGptea';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './logoutFunc';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/isLoggedInSlice';

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        dispatch(logout());
        navigate('/');
      })
      .catch((error) => alert(error));
  };

  return <button onClick={handleUnregister}>회원탈퇴</button>;
}

export default MyPage;

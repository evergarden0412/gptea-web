import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { GPTEA_ACCESS_TOKEN } from '../utils/loginGpteaFunc';
import { logoutGptea } from '../utils/logoutFunc';
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
        logoutGptea();
        dispatch(logout());
        navigate('/');
      })
      .catch((error) => alert(error));
  };

  return <button onClick={handleUnregister}>회원탈퇴</button>;
}

export default MyPage;

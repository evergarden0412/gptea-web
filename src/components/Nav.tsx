import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';
import { KAKAO_ACCESS_TOKEN } from '../pages/LoggedinKakao';
import { NAVER_ACCESS_TOKEN } from '../pages/LoggedinNaver';
import axios from 'axios';
import { GPTEA_ACCESS_TOKEN } from '../pages/loginGptea';

const NavWrapper = styled.section`
  width: 20%;
  background-color: green;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-decoration: none;
  padding: 1rem;
  color: white;

  &:hover {
    background-color: var(--hover);
  }
`;

const NavItemLogout = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-decoration: none;
  padding: 1rem;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: var(--hover);
  }
`;

const NavIcon = styled.div`
  margin-left: 1rem;
  width: 2rem;

  i {
    width: 2rem;
    text-align: center;
  }
`;

const NavText = styled.div`
  margin-left: 1rem;
`;

function Nav({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleNaverLogout = () => {
    axios(
      `/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_NAVER_SECRET_KEY}
      &access_token=${localStorage.getItem(NAVER_ACCESS_TOKEN)}
      &service_provider=NAVER`
    )
      .then(() => {
        localStorage.removeItem(NAVER_ACCESS_TOKEN);
      })
      .catch((err) => console.log('eee', err));
  };

  const handleKakaoLogout = () => {
    if (!localStorage.getItem(KAKAO_ACCESS_TOKEN)) {
      console.log('not logged in.');
      return;
    }

    axios('https://kapi.kakao.com/v1/user/logout', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem(KAKAO_ACCESS_TOKEN)}`,
      },
    })
      .then(() => {
        localStorage.removeItem(KAKAO_ACCESS_TOKEN);
      })
      .catch((err) => console.log('error!', err));
  };

  const handleGpteaLogout = () => {
    localStorage.removeItem(GPTEA_ACCESS_TOKEN);
    setIsLoggedIn(false);
    navigate('/');
    alert('logged out!');
  };

  const handleLogout = () => {
    if (localStorage.getItem(NAVER_ACCESS_TOKEN)) {
      handleNaverLogout();
    } else if (localStorage.getItem(KAKAO_ACCESS_TOKEN)) {
      handleKakaoLogout();
    }
    handleGpteaLogout();
  };

  return (
    <NavWrapper>
      <NavItem to='/'>
        <NavIcon>
          <i className='fa-solid fa-mug-hot'></i>
        </NavIcon>
        <NavText>Chat</NavText>
      </NavItem>
      <NavItem to='/scrapbooks'>
        <NavIcon>
          <i className='fa-regular fa-bookmark'></i>
        </NavIcon>
        <NavText>Scrap</NavText>
      </NavItem>
      <NavItem to='/highlights'>
        <NavIcon>
          <i className='fa-solid fa-highlighter'></i>
        </NavIcon>
        <NavText>Highlight</NavText>
      </NavItem>
      <NavItemLogout onClick={handleLogout}>
        <NavIcon>
          <i className='fa-solid fa-right-from-bracket'></i>
        </NavIcon>
        <NavText>Logout</NavText>
      </NavItemLogout>
    </NavWrapper>
  );
}

export default Nav;

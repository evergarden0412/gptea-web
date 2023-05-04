import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';

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
    fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_NAVER_SECRET_KEY}
      &access_token=${JSON.parse(localStorage.getItem('access') || '')}
      &service_provider=NAVER`,
      { mode: 'no-cors' }
    )
      .then(() => {
        localStorage.removeItem('access');
        setIsLoggedIn(false);
        navigate('/');
        alert('bye naver!');
      })
      .catch((e) => console.log('error!', e));
  };

  const handleKakaoLogout = () => {
    if (!localStorage.getItem('kakao_access')) {
      console.log('not logged in.');
      return;
    }

    fetch('https://kapi.kakao.com/v1/user/logout', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('kakao_access')}`,
      },
    })
      .then(() => {
        localStorage.removeItem('kakao_access');
        setIsLoggedIn(false);
        navigate('/');
        alert('bye kakao!');
      })
      .catch((e) => console.log('error!', e));
  };

  const handleLogout = () => {
    if (localStorage.getItem('access')) {
      handleNaverLogout();
    } else if (localStorage.getItem('kakao_access')) {
      handleKakaoLogout();
    }
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

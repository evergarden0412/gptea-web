import styled from 'styled-components';
import { useNavigate, NavLink, useMatch } from 'react-router-dom';

import { logoutGptea } from '../pages/logoutFunc';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/isLoggedInSlice';
import { isOpenNewChatModalAction } from '../redux/isOpenNewChatModalSlice';

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

const NavButton = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  line-height: 2rem;
`;

function Nav() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const matchChats = useMatch('/');

  const handleLogout = () => {
    logoutGptea();
    dispatch(logout());
    navigate('/');
  };

  const handleOpenNewChatModal = () => {
    dispatch(isOpenNewChatModalAction.open());
  };

  return (
    <NavWrapper>
      <NavItem to='/'>
        <NavIcon>
          <i className='fa-solid fa-mug-hot'></i>
        </NavIcon>
        <NavText>Chat</NavText>
        {matchChats && <NavButton onClick={handleOpenNewChatModal}>+</NavButton>}
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
      <NavItem to='/mypage'>
        <NavIcon>
          <i className='fa-solid fa-user'></i>
        </NavIcon>
        <NavText>My Page</NavText>
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

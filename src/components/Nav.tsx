import styled from 'styled-components';
import { useNavigate, NavLink, useLocation, matchPath } from 'react-router-dom';

import { logoutGptea } from '../utils/logoutFunc';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/isLoggedInSlice';
import { isOpenChatItemModalAction } from '../redux/isOpenChatItemModalSlice';

const NavWrapper = styled.section`
  width: 20%;
  background-color: var(--nav);
`;

const NavItem = styled(NavLink)<{ match: boolean }>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.7rem;
  margin: 0.3rem;
  position: relative;
  background-color: ${(props) => (props.match ? 'var(--white)' : 'transparent')};
  border-radius: 5px;
  color: ${(props) => (props.match ? 'var(--defalt)' : 'var(--white)')};

  &:hover {
    background-color: var(--hover);
    color: var(--defalt);
  }
`;

const NavItemLogout = styled.button`
  height: auto;
  display: flex;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
  width: calc(100% - 0.6rem);
  padding: 0.7rem;
  margin: 0.3rem;
  position: relative;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: var(--white);

  &:hover {
    background-color: var(--white);
    color: var(--default);
  }
`;

const NavIcon = styled.div`
  width: 2rem;

  i {
    width: 2rem;
    text-align: center;
  }
`;

const NavText = styled.div``;

const NavButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5rem;
  position: absolute;
  right: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
`;

function Nav() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const match = (routePath: string) => {
    if (matchPath(routePath, pathname)) return true;
    return false;
  };

  const handleLogout = () => {
    logoutGptea();
    dispatch(logout());
    navigate('/');
  };

  const handleOpenChatItemModal = () => {
    dispatch(isOpenChatItemModalAction.open(null));
  };

  return (
    <NavWrapper>
      <NavItem to='/' match={match('/') || match('/chats/:id')}>
        <NavIcon>
          <i className='fa-solid fa-mug-hot'></i>
        </NavIcon>
        <NavText>chat</NavText>
        {match('/') && <NavButton onClick={handleOpenChatItemModal}>+</NavButton>}
      </NavItem>
      <NavItem to='/scrapbooks' match={match('/scrapbooks') || match('/scrapbooks/:id/scraps')}>
        <NavIcon>
          <i className='fa-regular fa-bookmark'></i>
        </NavIcon>
        <NavText>scrap</NavText>
      </NavItem>
      <NavItem to='/mypage' match={match('/mypage')}>
        <NavIcon>
          <i className='fa-solid fa-user'></i>
        </NavIcon>
        <NavText>my page</NavText>
      </NavItem>
      <NavItemLogout onClick={handleLogout}>
        <NavIcon>
          <i className='fa-solid fa-right-from-bracket'></i>
        </NavIcon>
        <NavText>logout</NavText>
      </NavItemLogout>
    </NavWrapper>
  );
}

export default Nav;

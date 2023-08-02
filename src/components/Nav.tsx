import styled, { css } from "styled-components";
import { useNavigate, NavLink, useLocation, matchPath } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/isLoggedInSlice";
import { isOpenChatItemModalAction } from "../redux/isOpenChatItemModalSlice";
import { isOpenWithdrawalModalAction } from "../redux/isOpenWithdrawalModalSlice";
import { removeNaverToken } from "../api/social";
import { toastLogout } from "../utils/toasts";
import { NAVER_ACCESS_TOKEN } from "../pages/NaverLogin";
import { kakaoLogin } from "../pages/Login";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isOpenMenu, SetIsOpenMenu] = useState(false);

  const match = (routePath: string) => {
    if (matchPath(routePath, pathname)) return true;
    return false;
  };

  const removeSocialToken = async () => {
    if (localStorage.getItem(NAVER_ACCESS_TOKEN)) {
      removeNaverToken();
    } else if (kakaoLogin.Auth.getAccessToken()) {
      kakaoLogin.Auth.logout().catch((err: any) => console.log(err));
    }
  };

  const handleLogout = async () => {
    await removeSocialToken();
    dispatch(logout());
    localStorage.clear();
    toastLogout();
    navigate("/");
  };

  const handleWithdrawal = () => {
    dispatch(isOpenWithdrawalModalAction.open());
  };

  const handleOpenChatItemModal = () => {
    dispatch(isOpenChatItemModalAction.open(null));
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const toggleOpenMenu = () => {
    SetIsOpenMenu((prev) => !prev);
  };

  return (
    <NavWrapper>
      <MobileHeader>
        <MobileButton onClick={handleNavigateBack}>
          <i className="fa-solid fa-arrow-left"></i>
        </MobileButton>
        <span>Gptea</span>
        <MobileButton onClick={toggleOpenMenu}>
          <i className="fa-solid fa-bars"></i>
        </MobileButton>
      </MobileHeader>
      <NavMenu isOpenMenu={isOpenMenu} onClick={toggleOpenMenu}>
        <NavItems>
          <NavItemButton onClick={handleOpenChatItemModal}>
            <NavIcon>
              <i className="fa-solid fa-plus"></i>
            </NavIcon>
            <NavText>New Chat</NavText>
          </NavItemButton>
          <NavItem to="/" $match={match("/") || match("/chat/:id")}>
            <NavIcon>
              <i className="fa-solid fa-mug-hot"></i>
            </NavIcon>
            <NavText>Chat</NavText>
          </NavItem>
          <NavItem to="/scrapbook" $match={match("/scrapbook") || match("/scrapbook/:id")}>
            <NavIcon>
              <i className="fa-regular fa-bookmark"></i>
            </NavIcon>
            <NavText>Scrap</NavText>
          </NavItem>
        </NavItems>
        <NavItems>
          <NavItemButton onClick={handleLogout}>
            <NavIcon>
              <i className="fa-solid fa-right-from-bracket"></i>
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItemButton>
          <NavItemButton onClick={handleWithdrawal}>
            <NavIcon>
              <i className="fa-solid fa-user-slash"></i>
            </NavIcon>
            <NavText>Withdrawal</NavText>
          </NavItemButton>
        </NavItems>
      </NavMenu>
    </NavWrapper>
  );
}

/* 태블릿 및 PC용 CSS */
/* 모바일 우선 */

const NavWrapper = styled.section`
  @media screen and (min-width: 768px) {
    width: 20%;
    min-width: 220px;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 220px;
    height: 7rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    font-size: 1.6rem;
  }
`;

const NavMenu = styled.nav<{ isOpenMenu: boolean }>`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--nav);
    padding: 0 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 70px);

    ${({ isOpenMenu }) =>
      isOpenMenu
        ? css`
            display: flex;
            flex-direction: column;
            background-color: var(--message);
            padding: 0 2rem;
          `
        : css`
            display: none;
          `};
  }
`;

const NavItems = styled.div`
  &:last-child {
    button {
      color: var(--gray-dark);
    }
  }
`;

const NavItem = styled(NavLink)<{ $match: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 2rem 1rem;
  margin: 1rem 0;
  position: relative;
  background-color: ${(props) => (props.$match ? "var(--white)" : "transparent")};
  border-radius: 0.5rem;
  color: ${(props) => (props.$match ? "var(--defalt)" : "var(--white)")};
  font-size: 1.6rem;

  &:hover {
    background-color: var(--hover);
    color: var(--defalt);
  }
`;

const NavItemButton = styled.button`
  height: auto;
  display: flex;
  align-items: center;
  text-decoration: none;
  width: 100%;
  padding: 2rem 1rem;
  margin: 1rem 0;
  position: relative;
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--white);
  font-size: 1.6rem;

  &:hover {
    background-color: var(--white);
    color: var(--default);
  }
`;

const NavIcon = styled.div`
  width: 2.5rem;
  text-align: left;

  i {
    width: 2rem;
  }
`;

const NavText = styled.div``;

/* 모바일 전용 컴포넌트 */

const MobileHeader = styled.header`
  @media screen and (min-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--white);
  }
`;

const MobileButton = styled.button`
  font-size: 1.6rem;
  padding: 0 2rem;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MyGptea from "./pages/MyGptea";
import Login from "./pages/Login";
import NaverLogin from "./pages/NaverLogin";
import KakaoLogin from "./pages/KakaoLogin";
import { GPTEA_ACCESS_TOKEN, GPTEA_REFRESH_TOKEN, refreshGpteaToken } from "./utils/loginGpteaFunc";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { login } from "./redux/isLoggedInSlice";
import { useEffect } from "react";
import { decode } from "jsonwebtoken";
import ChatItemModal from "./components/ChatItemModal";
import ScrapbookModal from "./components/ScrapbookModal";
import ScrapModal from "./components/ScrapModal";
import WithdrawalModal from "./components/WithdrawalModal";
import { toastFailToLogin, toastLogin } from "./utils/toasts";

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    width: fit-content;
    min-width: 300px;
    font-size: 20px;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

function App() {
  const dispatch = useAppDispatch();
  const { isOpenChatItemModal, isOpenScrapbookModal, isOpenScrapModal, isOpenWithdrawalModal } = useAppSelector(
    (state) => state
  );

  useEffect(() => {
    // 로컬스토리지에 접근 토근이 있으면 검증
    // 만료 전이면 로그인
    // 만료됐으면 refresh토큰으로 재발급 시도
    // 재발급 성공하면 로그인
    // 재발급 실패하면 로컬스토리지 비우며 토큰 정보 삭제
    if (localStorage.getItem(GPTEA_ACCESS_TOKEN)) {
      const decoded = decode(localStorage.getItem(GPTEA_ACCESS_TOKEN) || "") as { exp: number };
      if (decoded.exp > Date.now() / 1000) {
        toastLogin();
        dispatch(login());
      } else
        refreshGpteaToken()
          .then(() => {
            toastLogin();
            dispatch(login());
          })
          .catch(() => {
            console.log("exsisting tokens are expired.");
            toastFailToLogin();
            localStorage.removeItem(GPTEA_ACCESS_TOKEN);
            localStorage.removeItem(GPTEA_REFRESH_TOKEN);
          });
    }
  }, []);

  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);

  return (
    <AppWrapper>
      <Routes>
        <Route path="/*" element={isLoggedIn ? <MyGptea /> : <Login />} />
        <Route path="/login/naver" element={<NaverLogin />} />
        <Route path="/login/kakao" element={<KakaoLogin />} />
      </Routes>
      {isOpenChatItemModal.status && <ChatItemModal chat={isOpenChatItemModal.chat} />}
      {isOpenScrapbookModal.status && <ScrapbookModal scrapbook={isOpenScrapbookModal.scrapbook} />}
      {isOpenScrapModal.status &&
        (isOpenScrapModal.scrapId ? (
          <ScrapModal message={isOpenScrapModal.message} scrapId={isOpenScrapModal.scrapId} />
        ) : (
          <ScrapModal message={isOpenScrapModal.message} />
        ))}
      {isOpenWithdrawalModal.status && <WithdrawalModal />}
      <StyledToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        theme="light"
      />
    </AppWrapper>
  );
}

export default App;

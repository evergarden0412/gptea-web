import styled from "styled-components";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { login } from "./redux/isLoggedInSlice";
import { recreateGpteaToken } from "./api/gpteaAuth";
import { GPTEA_ACCESS_TOKEN, GPTEA_EXPIRES_IN, setGpteaTokenInStorage } from "./utils/util";
import { toastLogin } from "./utils/toasts";
import MyGptea from "./pages/MyGptea";
import Login from "./pages/Login";
import NaverLogin from "./pages/NaverLogin";
import KakaoLogin from "./pages/KakaoLogin";

export default function App() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state);

  const regenerateGpteaToken = async () => {
    recreateGpteaToken()
      .then((res) => {
        const { accessToken, refreshToken } = res;
        setGpteaTokenInStorage(accessToken, refreshToken);
        console.log("tokens regenerated.");
        toastLogin();
        dispatch(login());
      })
      .catch(() => {
        console.log("exsisting tokens are expired.");
        localStorage.clear();
      });
  };

  useEffect(() => {
    // 로컬스토리지에 접근 토근이 있으면 검증
    // 만료 전이면 로그인
    // 만료됐으면 refresh토큰으로 재발급 시도
    // 재발급 성공하면 로그인
    // 재발급 실패하면 로컬스토리지 비우며 토큰 정보 삭제
    if (localStorage.getItem(GPTEA_ACCESS_TOKEN)) {
      if (Number(localStorage.getItem(GPTEA_EXPIRES_IN)) > Date.now() / 1000 + 60) {
        toastLogin();
        dispatch(login());
      } else regenerateGpteaToken();
    }
  }, []);

  return (
    <AppWrapper>
      <StyledToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        theme="light"
      />
      <Routes>
        <Route path="/*" element={isLoggedIn ? <MyGptea /> : <Login />} />
        <Route path="/login/naver" element={<NaverLogin />} />
        <Route path="/login/kakao" element={<KakaoLogin />} />
      </Routes>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 100vw;
    height: 100vh;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    height: auto;
  }
`;

const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    width: fit-content;
    min-width: 300px;
    font-size: 2rem;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import MyGptea from './pages/MyGptea';
import Login from './pages/Login';
import NaverLogin from './pages/NaverLogin';
import KakaoLogin from './pages/KakaoLogin';
import { GPTEA_ACCESS_TOKEN, GPTEA_REFRESH_TOKEN, refreshGpteaToken } from './utils/loginGpteaFunc';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { login } from './redux/isLoggedInSlice';
import { useEffect } from 'react';
import { decode } from 'jsonwebtoken';

const AppWrapper = styled.div`
  width: 80vw;
  height: 80vh;
`;

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 로컬스토리지에 접근 토근이 있으면 검증
    // 만료 전이면 로그인
    // 만료됐으면 refresh토큰으로 재발급 시도
    // 재발급 성공하면 로그인
    // 재발급 실패하면 로컬스토리지 비우며 토큰 정보 삭제
    if (localStorage.getItem(GPTEA_ACCESS_TOKEN)) {
      const decoded = decode(localStorage.getItem(GPTEA_ACCESS_TOKEN) || '') as { exp: number };
      if (decoded.exp > Date.now() / 1000) {
        alert('Gptea logged in!');
        dispatch(login());
      } else
        refreshGpteaToken()
          .then(() => {
            alert('Gptea logged in!');
            dispatch(login());
          })
          .catch(() => {
            console.log('exsisting tokens are expired.');
            localStorage.removeItem(GPTEA_ACCESS_TOKEN);
            localStorage.removeItem(GPTEA_REFRESH_TOKEN);
          });
    }
  }, []);

  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);

  return (
    <AppWrapper>
      <Routes>
        <Route path='/*' element={isLoggedIn ? <MyGptea /> : <Login />} />
        <Route path='/login/naver' element={<NaverLogin />} />
        <Route path='/login/kakao' element={<KakaoLogin />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;

import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import MyGptea from './pages/MyGptea';
import Login from './pages/Login';
import NaverLogin from './pages/NaverLogin';
import KakaoLogin from './pages/KakaoLogin';
import { GPTEA_ACCESS_TOKEN } from './utils/loginGpteaFunc';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { login } from './redux/isLoggedInSlice';
import { useEffect } from 'react';

const AppWrapper = styled.div`
  width: 80vw;
  height: 80vh;
`;

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(GPTEA_ACCESS_TOKEN)) {
      dispatch(login());
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

import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';

import MyGptea from './pages/MyGptea';
import Welcome from './pages/Welcome';
import LoggedinNaver from './pages/LoggedinNaver';
import LoggedinKakao from './pages/LoggedinKakao';

const AppWrapper = styled.div`
  width: 80vw;
  height: 80vh;
`;

function App() {
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);

  return (
    <AppWrapper>
      <Routes>
        <Route path='/*' element={isLoggedIn ? <MyGptea /> : <Welcome />} />
        <Route path='/login' element={<LoggedinNaver />} />
        <Route path='/login/kakao' element={<LoggedinKakao />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;

import styled from 'styled-components';
import MyGptea from './pages/MyGptea';
import Welcome from './pages/Welcome';
import LoggedinNaver from './pages/LoggedinNaver';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoggedinKakao from './pages/LoggedinKakao';

const AppWrapper = styled.div`
  width: 80vw;
  height: 80vh;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppWrapper>
      <Routes>
        <Route path='/*' element={isLoggedIn ? <MyGptea setIsLoggedIn={setIsLoggedIn} /> : <Welcome />} />
        <Route path='/login' element={<LoggedinNaver setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/login/kakao' element={<LoggedinKakao setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;

import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import Chats from '../pages/Chats';
import Chat from '../pages/Chat';
import Scrapbooks from '../pages/Scrapbooks';
import Scraps from '../pages/Scraps';
import MyPage from '../pages/MyPage';

const FeatureWrapper = styled.section`
  width: 80%;
  height: 100%;
`;

function Feature() {
  return (
    <FeatureWrapper>
      <Routes>
        <Route path='/' element={<Chats />} />
        <Route path='/chats/:chatId' element={<Chat />} />
        <Route path='/scrapbooks' element={<Scrapbooks />} />
        <Route path='/scrapbooks/:scrapbookId' element={<Scraps />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </FeatureWrapper>
  );
}

export default Feature;

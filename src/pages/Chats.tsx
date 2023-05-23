import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import ChatItem from '../components/ChatItem';
import ChatItemModal from '../components/NewChatModal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { requestGetChats } from '../redux/requestGetChatsSlice';

const ChatsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export interface IChat {
  createdAt: string;
  id: string;
  name: string;
}

function Chats() {
  const dispatch = useAppDispatch();
  const {
    isOpenChatItemModal,
    requestGetChats: { data: chats },
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(requestGetChats());
  }, []);

  return (
    <>
      <ChatsWrapper>
        <ul className='Chats__list'>
          {chats.map((chat) => (
            <Link to={`/chats/${chat.id}`} key={chat.id}>
              <ChatItem chat={chat} />
            </Link>
          ))}
        </ul>
      </ChatsWrapper>
      {isOpenChatItemModal.status && <ChatItemModal chat={isOpenChatItemModal.chat} />}
    </>
  );
}

export default Chats;

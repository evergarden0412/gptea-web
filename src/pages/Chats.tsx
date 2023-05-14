import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ChatItem from '../components/ChatItem';
import NewChatModal from '../components/NewChatModal';
import { ERROR_GET_DATA } from '../errors';
import { GPTEA_ACCESS_TOKEN } from './loginGptea';
import { useAppSelector } from '../redux/hooks';

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
  const [chats, setChats] = useState<IChat[]>([]);
  const isOpenNewChatModal = useAppSelector((state) => state.isOpenNewChatModal);

  useEffect(() => {
    axios('/me/chats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    })
      .then((res) => {
        setChats(res.data.chats);
      })
      .catch((err) => alert({ ERROR_GET_DATA, err }));
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
      {isOpenNewChatModal && <NewChatModal />}
    </>
  );
}

export default Chats;

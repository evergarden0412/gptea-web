import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ChatItem from '../components/ChatItem';
import { useEffect, useState } from 'react';
import { ERROR_GET_DATA } from '../errors';
import { GPTEA_ACCESS_TOKEN } from './loginGptea';

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

  useEffect(() => {
    fetch('/me/chats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(ERROR_GET_DATA);
      })
      .then((json) => {
        setChats(json.chats);
      })
      .catch((error) => alert(error));
  }, []);

  console.log('Chats', chats);

  return (
    <ChatsWrapper>
      <ul className='Chats__list'>
        {chats.map((chat) => (
          <Link to={`/chats/${chat.id}`} key={chat.id}>
            <ChatItem chat={chat} />
          </Link>
        ))}
      </ul>
    </ChatsWrapper>
  );
}

export default Chats;

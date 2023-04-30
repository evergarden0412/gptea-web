import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ChatItem from '../components/ChatItem';
import { useEffect, useState } from 'react';

const ChatsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

function Chats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch('/me/chats')
      .then((response) => response.json())
      .then((json) => setChats(json.chats));
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

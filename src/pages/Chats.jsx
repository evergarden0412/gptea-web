import styled from 'styled-components';
import { Link } from 'react-router-dom';

import dummyChat from '../dummyChat';
import ChatItem from '../components/ChatItem';

const ChatsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

function Chats() {
  return (
    <ChatsWrapper>
      <ul className="Chats__list">
        {dummyChat.map((chat) => (
          <Link to={`/chats/${chat.id}`} key={chat.id}>
            <ChatItem chat={chat} />
          </Link>
        ))}
      </ul>
    </ChatsWrapper>
  );
}

export default Chats;

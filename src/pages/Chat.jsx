import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Messages from '../components/Messages';
import Prompt from '../components/Prompt';

const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function Chat() {
  const { chatId } = useParams();

  return (
    <ChatWrapper>
      <Messages chatId={Number(chatId)} />
      <Prompt />
    </ChatWrapper>
  );
}

export default Chat;

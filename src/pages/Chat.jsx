import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Messages from '../components/Messages';
import Prompt from '../components/Prompt';

const Box = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

function Chat() {
  const { chatId } = useParams();

  return (
    <Box className="Chat">
      <Messages chatId={Number(chatId)} />
      <Prompt />
    </Box>
  );
}

export default Chat;

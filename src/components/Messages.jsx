import styled from 'styled-components';
import dummyMessage from '../dummyMessage';
import Message from './Message';

const MessagesWrapper = styled.div`
  height: 90%;
  padding: 1rem;
  padding-top: 0;
`;

const MessagesContainer = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

function Messages({ chatId }) {
  const chatMessages = dummyMessage.filter((message) => message.chat === chatId);

  return (
    <MessagesWrapper>
      <MessagesContainer>
        {chatMessages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </MessagesContainer>
    </MessagesWrapper>
  );
}

export default Messages;

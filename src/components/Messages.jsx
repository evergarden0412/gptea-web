import styled from 'styled-components';
import dummyMessage from '../dummyMessage';
import Message from './Message';

const MessagesWrapper = styled.ul`
  height: 90%;
  padding: 1rem;
`;

function Messages({ chatId }) {
  const chatMessages = dummyMessage.filter((message) => message.chat === chatId);

  return (
    <MessagesWrapper>
      {chatMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </MessagesWrapper>
  );
}

export default Messages;

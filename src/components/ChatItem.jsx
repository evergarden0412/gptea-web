import styled from 'styled-components';

const ChatItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  padding: 1rem 1.5rem;

  &:hover {
    border: none;
    border-radius: 1rem;
    background-color: var(--hover);
  }
`;

const ChatItemText = styled.div`
  font-size: 1.5rem;
`;

const ChatItemButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatItemButton = styled.button`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;

  i {
    font-size: 1.5rem;
  }
`;

function ChatItem({ chat }) {
  return (
    <ChatItemWrapper>
      <ChatItemText>{chat.name}</ChatItemText>
      <ChatItemButtons>
        <ChatItemButton>
          <i className='fa-solid fa-pen-to-square'></i>
        </ChatItemButton>
        <ChatItemButton>
          <i className='fa-solid fa-trash-can'></i>
        </ChatItemButton>
      </ChatItemButtons>
    </ChatItemWrapper>
  );
}

export default ChatItem;

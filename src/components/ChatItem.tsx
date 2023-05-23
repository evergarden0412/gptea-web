import styled from 'styled-components';

import { IChat } from '../pages/Chats';
import axios from 'axios';
import { GPTEA_ACCESS_TOKEN } from '../utils/loginGpteaFunc';
import { requestGetChats } from '../redux/requestGetChatsSlice';
import { useAppDispatch } from '../redux/hooks';
import { isOpenChatItemModalAction } from '../redux/isOpenNewChatModalSlice';

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

  &:last-child {
    margin-left: 1rem;
  }

  i {
    font-size: 1.5rem;
  }
`;

interface IChatItemProps {
  chat: IChat;
}

function ChatItem({ chat }: IChatItemProps) {
  const dispatch = useAppDispatch();

  const handleOpenChatItemModal = () => {
    dispatch(isOpenChatItemModalAction.open(chat));
  };

  const handleDeleteChat = () => {
    axios(`/me/chats/${chat.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` } })
      .then((res) => {
        console.log(res);
        dispatch(requestGetChats());
      })
      .catch((err) => alert(err));
  };

  return (
    <ChatItemWrapper>
      <ChatItemText>{chat.name}</ChatItemText>
      <ChatItemButtons
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ChatItemButton onClick={handleOpenChatItemModal}>
          <i className='fa-solid fa-pen-to-square'></i>
        </ChatItemButton>
        <ChatItemButton onClick={handleDeleteChat}>
          <i className='fa-solid fa-trash-can'></i>
        </ChatItemButton>
      </ChatItemButtons>
    </ChatItemWrapper>
  );
}

export default ChatItem;

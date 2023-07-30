import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { requestGetChats } from "../redux/requestGetChatsSlice";
import { isOpenChatItemModalAction } from "../redux/isOpenChatItemModalSlice";
import { deleteChat } from "../api/gptea";
import { toastFailToRequest, toastSuccessToDeleteChat } from "../utils/toasts";
import { IChat } from "../utils/interfaces";

interface IChatItemProps {
  chat: IChat;
}

export default function ChatItem({ chat }: IChatItemProps) {
  const dispatch = useAppDispatch();

  const handleOpenChatItemModal = () => {
    dispatch(isOpenChatItemModalAction.open(chat));
  };

  const handleDeleteChat = () => {
    deleteChat(chat.id)
      .then(() => {
        toastSuccessToDeleteChat();
        dispatch(requestGetChats());
      })
      .catch(() => {
        toastFailToRequest();
      });
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
          <i className="fa-solid fa-pen-to-square"></i>
        </ChatItemButton>
        <ChatItemButton onClick={handleDeleteChat}>
          <i className="fa-solid fa-trash-can"></i>
        </ChatItemButton>
      </ChatItemButtons>
    </ChatItemWrapper>
  );
}

const ChatItemWrapper = styled.li`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-right: 2rem;

    &:hover {
      font-weight: 600;
      background-color: var(--lightgray);
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    &:hover {
      font-weight: 600;
      background-color: var(--lightgray);
    }
  }
`;

const ChatItemText = styled.div`
  font-size: 1.6rem;
`;

const ChatItemButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: auto;
`;

const ChatItemButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: var(--lightgray);
  border: none;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--white);
  }

  &:last-child {
    margin-left: 1rem;
  }

  i {
    font-size: 1.6rem;
  }
`;

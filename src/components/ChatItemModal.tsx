import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

import { useAppDispatch } from '../redux/hooks';
import { isOpenChatItemModalAction } from '../redux/isOpenChatItemModalSlice';
import { GPTEA_ACCESS_TOKEN } from '../utils/loginGpteaFunc';
import { requestGetChats } from '../redux/requestGetChatsSlice';
import { IChat } from '../pages/Chats';

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalBox = styled.div`
  width: 50%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`;

interface INewChatModal {
  chat: IChat | null;
}

function ChatItemModal({ chat }: INewChatModal) {
  const dispatch = useAppDispatch();
  const [chatName, setChatName] = useState(chat ? chat.name : '');

  const handleCloseChatItemModal = () => {
    dispatch(isOpenChatItemModalAction.close());
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (chat)
      axios(`/me/chats/${chat.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
        data: { name: chatName },
      })
        .then((res) => {
          console.log(res);
          setChatName('');
          dispatch(requestGetChats());
          dispatch(isOpenChatItemModalAction.close());
        })
        .catch((error) => console.log(error));
    else
      axios('/me/chats', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
        data: { name: chatName },
      })
        .then((res) => {
          console.log(res);
          setChatName('');
          dispatch(requestGetChats());
          dispatch(isOpenChatItemModalAction.close());
        })
        .catch((error) => console.log(error));
  };

  return (
    <ModalWrapper onClick={handleCloseChatItemModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmitForm}>
          <label>chat name</label>
          <input placeholder='채팅 이름을 입력하세요.' value={chatName} onChange={handleChangeInput} autoComplete='false'></input>
          <button>submit</button>
        </form>
      </ModalBox>
    </ModalWrapper>
  );
}

export default ChatItemModal;

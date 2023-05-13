import styled from 'styled-components';
import { useAppDispatch } from '../redux/hooks';
import { isOpenNewChatModalAction } from '../redux/isOpenNewChatModalSlice';
import { useState } from 'react';
import axios from 'axios';
import { GPTEA_ACCESS_TOKEN } from '../pages/loginGptea';

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  width: 50%;
  height: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NewChatModal() {
  const dispatch = useAppDispatch();
  const [chatName, setChatName] = useState('');

  const handleCloseNewChatModal = () => {
    dispatch(isOpenNewChatModalAction.close());
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios('/me/chats', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
      data: { name: chatName },
    })
      .then((res) => {
        console.log(res);
        setChatName('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <ModalWrapper onClick={handleCloseNewChatModal}>
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

export default NewChatModal;

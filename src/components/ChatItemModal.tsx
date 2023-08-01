import styled from "styled-components";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { isOpenChatItemModalAction } from "../redux/isOpenChatItemModalSlice";
import { requestGetChats } from "../redux/requestGetChatsSlice";
import { createChat, modifyChat } from "../api/gptea";
import { toastFailToRequest, toastSuccessToCreateChat, toastSuccessToModifyChatName } from "../utils/toasts";
import { IChat } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

interface IChatItemModalProps {
  chat: IChat | null;
}

export default function ChatItemModal({ chat }: IChatItemModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [chatName, setChatName] = useState(chat ? chat.name : "새 채팅");

  const handleCloseChatItemModal = () => {
    dispatch(isOpenChatItemModalAction.close());
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (chat)
      modifyChat(chat.id, { name: chatName })
        .then(() => {
          setChatName("");
          toastSuccessToModifyChatName();
          dispatch(requestGetChats());
          dispatch(isOpenChatItemModalAction.close());
        })
        .catch(() => {
          toastFailToRequest();
        });
    else
      createChat({ name: chatName })
        .then(() => {
          setChatName("");
          toastSuccessToCreateChat();
          dispatch(requestGetChats());
          dispatch(isOpenChatItemModalAction.close());
          navigate("/");
        })
        .catch(() => {
          toastFailToRequest();
        });
  };

  return (
    <ModalWrapper onClick={handleCloseChatItemModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>Chat 추가</span>
        </Title>
        <Form onSubmit={handleSubmitForm}>
          <InputLine>
            <Label>채팅 이름</Label>
            <Input
              placeholder="채팅 이름을 입력하세요."
              value={chatName}
              onChange={handleChangeInput}
              autoComplete="false"
              autoFocus
              onFocus={(event) => event.target.select()}
            ></Input>
          </InputLine>
          <Button>완료</Button>
        </Form>
      </ModalBox>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
`;

const ModalBox = styled.div`
  @media screen and (min-width: 768px) {
    width: 600px;
    height: 300px;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--white);
    cursor: auto;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 300px;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--white);
    cursor: auto;
  }
`;

const Title = styled.div`
  @media screen and (min-width: 768px) {
    font-weight: 600;
    margin-bottom: 50px;

    & span {
      font-size: 1.6rem;
      background: linear-gradient(to top, #ffe69b 50%, transparent 50%);
      padding: 0 5px;
    }
  }

  @media screen and (max-width: 768px) {
    font-weight: 600;
    margin-bottom: 20px;

    & span {
      font-size: 1.6rem;
      background: linear-gradient(to top, #ffe69b 50%, transparent 50%);
      padding: 0 5px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputLine = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    display: flex;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  @media screen and (min-width: 768px) {
    width: 150px;
    min-width: fit-content;
    height: 50px;
    line-height: 50px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    min-width: fit-content;
    height: 40px;
    line-height: 40px;
    font-size: 1.6rem;
  }
`;

const Input = styled.input`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 1.6rem;
    border: none;
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    font-size: 1.6rem;
    border: none;
    outline: none;
  }
`;

const Button = styled.button`
  @media screen and (min-width: 768px) {
    width: 150px;
    height: 50px;
    line-height: 50px;
    font-size: 1.6rem;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    height: 40px;
    line-height: 40px;
    font-size: 1.6rem;
    border: none;
    cursor: pointer;
  }
`;

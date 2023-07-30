import styled from "styled-components";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { requestGetMessages } from "../redux/requestGetMessagesSlice";
import { sendMessage } from "../api/gptea";
import { toastFailToRequest } from "../utils/toasts";

interface IPromptProps {
  chatId?: string;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Prompt({ chatId, isFetching, setIsFetching }: IPromptProps) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFetching) return;

    setIsFetching(true);
    sendMessage(chatId, { content: message })
      .then(() => {
        setMessage("");
        dispatch(requestGetMessages(chatId));
      })
      .catch(() => {
        toastFailToRequest();
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <PromptWrapper>
      <PromptForm onSubmit={handleSubmitMessage}>
        <PromptInput placeholder="ask anything" value={message} onChange={(e) => setMessage(e.target.value)} />
        <PromptButton>
          <i className="Prompt__button--submit fa-solid fa-paper-plane"></i>
        </PromptButton>
      </PromptForm>
    </PromptWrapper>
  );
}

const PromptWrapper = styled.div`
  * {
    font-size: 1.6rem;
  }

  @media screen and (min-width: 768px) {
    width: 100%;
    height: 10%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
`;

const PromptForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
`;

const PromptInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding-right: 1.5rem;

  &::placeholder {
    color: var(--gray);
  }
`;

const PromptButton = styled.button`
  position: absolute;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  cursor: pointer;
  border: none;

  &:hover {
    i {
      text-shadow: white 1px 0 10px;
    }
  }
`;

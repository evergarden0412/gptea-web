import styled from "styled-components";
import { useRef, useState } from "react";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
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
      .finally(() => {
        setIsFetching(false);
        if (textareaRef.current) textareaRef.current.disabled = false;
      });
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleKeyUpEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.currentTarget.disabled = true;
      handleSubmitMessage();
    }
  };

  return (
    <PromptWrapper>
      <PromptForm onSubmit={handleSubmitMessage}>
        <PromptTextarea
          ref={textareaRef}
          placeholder="ask anything"
          value={message}
          rows={1}
          onChange={handleChangeTextarea}
          onKeyUp={handleKeyUpEnter}
        />
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
  padding: 1.5rem 2rem;
  padding-right: 4rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
`;

const PromptTextarea = styled.textarea`
  width: 100%;
  height: auto;
  max-height: 100%;
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
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  cursor: pointer;
  border: none;

  &:hover {
    i {
      text-shadow: white 1px 0 10px;
    }
  }
`;

import axios from "axios";
import styled from "styled-components";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetMessages } from "../redux/requestGetMessagesSlice";
import { requestAsk } from "../redux/requestAskSlice";

const PromptWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
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
  border: 2px solid #ededed;
`;

const PromptInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1rem;
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

  i {
    font-size: 1rem;
  }

  &:hover {
    i {
      text-shadow: white 1px 0 10px;
    }
  }
`;

interface IPrompt {
  chatId?: string;
}

function Prompt({ chatId }: IPrompt) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const {
    requestAsk: { status },
  } = useAppSelector((state) => state);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    dispatch(requestAsk({ chatId, question: message })).then(() => {
      dispatch(requestGetMessages(chatId));
      setMessage("");
    });
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

export default Prompt;

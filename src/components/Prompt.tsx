import axios from 'axios';
import styled from 'styled-components';
import { GPTEA_ACCESS_TOKEN } from '../utils/loginGpteaFunc';
import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { requestGetMessages } from '../redux/requestGetMessagesSlice';

const PromptWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const PromptForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  background-color: var(--hover);
`;

const PromptInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  padding-right: 3rem;
`;

const PromptButton = styled.button`
  position: absolute;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;

  i {
    font-size: 1.5rem;
  }
`;

interface IPrompt {
  chatId?: string;
}

function Prompt({ chatId }: IPrompt) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  let isFetching = false;

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFetching) return;

    isFetching = true;
    axios(`/me/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
      data: { content: message },
    })
      .then((res) => {
        console.log(res);
        dispatch(requestGetMessages(chatId));
        setMessage('');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isFetching = false;
      });
  };

  return (
    <PromptWrapper>
      <PromptForm onSubmit={handleSubmitMessage}>
        <PromptInput placeholder='ask anything' value={message} onChange={(e) => setMessage(e.target.value)} />
        <PromptButton>
          <i className='Prompt__button--submit fa-solid fa-paper-plane'></i>
        </PromptButton>
      </PromptForm>
    </PromptWrapper>
  );
}

export default Prompt;

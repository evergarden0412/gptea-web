import styled from 'styled-components';
import Message from './Message';
import { useState, useEffect } from 'react';
import { GPTEA_ACCESS_TOKEN } from '../pages/loginGptea';
import axios from 'axios';

const MessagesWrapper = styled.div`
  height: 90%;
  padding: 1rem;
  padding-top: 0;
`;

const MessagesContainer = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

export interface IMessage {
  chatId: string;
  content: string;
  createdAt: string;
  seq: number;
  role: string;
}

interface IMessagesProps {
  chatId?: string;
}

function Messages({ chatId }: IMessagesProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    axios(`/me/chats/${chatId}/messages`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    }).then((res) => {
      const newMessages = res.data.messages.map((message: IMessage) => {
        message.seq % 2 === 1 ? (message.role = 'user') : (message.role = 'ai');
        return message;
      }); // message.role api에 추가될 예정
      setMessages(newMessages);
    });
  }, []);

  console.log('Messages', messages);

  return (
    <MessagesWrapper>
      <MessagesContainer>
        {messages.map((message) => {
          const messageId = message.chatId + message.seq.toString(); // message.id가 따로 존재하지 않음
          return <Message key={messageId} message={message} />;
        })}
      </MessagesContainer>
    </MessagesWrapper>
  );
}

export default Messages;

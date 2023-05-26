import styled from 'styled-components';
import { useEffect, useRef } from 'react';

import Message from './Message';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { requestGetMessages } from '../redux/requestGetMessagesSlice';

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
  role?: string;
}

interface IMessagesProps {
  chatId?: string;
} // optional because of {chatId} = useParams()

function Messages({ chatId }: IMessagesProps) {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLUListElement>(null);

  const {
    requestGetMessages: { data: messages },
  } = useAppSelector((state) => state);

  let newMessages = JSON.parse(JSON.stringify(messages)).map((message: IMessage) => {
    message.seq % 2 === 1 ? (message.role = 'user') : (message.role = 'ai');
    return message;
  }); // message.role api에 추가될 예정
  newMessages = newMessages.reverse(); // 최신메세지 맨 밑으로

  useEffect(() => {
    dispatch(requestGetMessages(chatId));
  }, []);

  useEffect(() => {
    scrollRef.current && (scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight);
  }, [newMessages]);

  return (
    <MessagesWrapper>
      <MessagesContainer ref={scrollRef}>
        {newMessages.map((message: IMessage) => {
          const messageId = message.chatId + message.seq.toString(); // message.id가 따로 존재하지 않음
          return <Message key={messageId} message={message} />;
        })}
      </MessagesContainer>
    </MessagesWrapper>
  );
}

export default Messages;

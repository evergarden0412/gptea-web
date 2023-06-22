import styled from "styled-components";
import { useEffect, useRef } from "react";

import Message from "./Message";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetMessages } from "../redux/requestGetMessagesSlice";
import { IScrap } from "../pages/Scraps";

const MessagesWrapper = styled.div`
  height: 90%;
  margin-bottom: 1rem;
`;

const MessagesContainer = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

export interface IMessage {
  chatId?: string;
  chatID?: string;
  content: string;
  createdAt: string;
  seq: number;
  role?: string;
  scrap?: IScrap;
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

  const orderedMessages = JSON.parse(JSON.stringify(messages)).sort((a: IMessage, b: IMessage) => a.seq - b.seq);

  useEffect(() => {
    if (window.location.hash) {
      const scrollToHashElement = () => {
        const { hash } = window.location;
        const elementToScroll = document.getElementById(hash?.replace("#", ""));
        console.log("el", elementToScroll);
        if (!elementToScroll) return;

        scrollRef.current && (scrollRef.current.scrollTop = elementToScroll.offsetTop - 30);
      };

      scrollToHashElement();
      window.addEventListener("hashchange", scrollToHashElement);
      return window.removeEventListener("hashchange", scrollToHashElement);
    }
    dispatch(requestGetMessages(chatId));
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    scrollRef.current &&
      (scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight);
  }, [orderedMessages]);

  return (
    <MessagesWrapper>
      <MessagesContainer ref={scrollRef}>
        {orderedMessages.map((message: IMessage) => {
          const messageId = message.chatId + message.seq.toString(); // message.id가 따로 존재하지 않음
          return <Message key={messageId} message={message} />;
        })}
      </MessagesContainer>
    </MessagesWrapper>
  );
}

export default Messages;

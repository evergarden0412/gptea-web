import styled from "styled-components";
import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetMessages } from "../redux/requestGetMessagesSlice";
import { IScrap } from "../pages/Scraps";
import Message from "./Message";
import Loading from "./Loading";

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
  isFetching: boolean;
} // optional because of {chatId} = useParams()

export default function Messages({ chatId, isFetching }: IMessagesProps) {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLUListElement>(null);

  const {
    requestGetMessages: { data: messages },
  } = useAppSelector((state) => state);

  const orderedMessages = JSON.parse(JSON.stringify(messages)).sort((a: IMessage, b: IMessage) => a.seq - b.seq);

  useEffect(() => {
    dispatch(requestGetMessages(chatId));

    const scrollToHashElement = () => {
      const { hash } = window.location;
      const elementToScroll = document.getElementById(hash?.replace("#", ""));
      console.log("el", elementToScroll);
      if (!elementToScroll) return;
      scrollRef.current && (scrollRef.current.scrollTop = elementToScroll.offsetTop - 30);
    };

    if (window.location.hash) {
      scrollToHashElement();
      window.addEventListener("hashchange", scrollToHashElement);
    }
    return () => window.removeEventListener("hashchange", scrollToHashElement);
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
        {isFetching && <Loading />}
      </MessagesContainer>
    </MessagesWrapper>
  );
}

const MessagesWrapper = styled.div`
  height: 90%;
  margin-bottom: 1rem;
`;

const MessagesContainer = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

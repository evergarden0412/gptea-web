import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetChats } from "../redux/requestGetChatsSlice";
import ChatItem from "../components/ChatItem";

export default function Chats() {
  const dispatch = useAppDispatch();
  const {
    requestGetChats: { data: chats },
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(requestGetChats());
  }, []);

  return (
    <>
      <Helmet>
        <title>Chats | GPTea</title>
      </Helmet>
      <ChatsWrapper>
        {chats.length === 0 ? (
          <Text>새 채팅을 시작해 보세요!</Text>
        ) : (
          <ul className="Chats__list">
            {chats.map((chat) => (
              <Link to={`/chat/${chat.id}`} key={chat.id}>
                <ChatItem chat={chat} />
              </Link>
            ))}
          </ul>
        )}
      </ChatsWrapper>
    </>
  );
}

const ChatsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

const Text = styled.p`
  color: var(--gray);
  font-size: 2rem;

  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
`;

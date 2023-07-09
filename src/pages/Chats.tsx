import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
      <ChatsWrapper>
        <ul className="Chats__list">
          {chats.map((chat) => (
            <Link to={`/chats/${chat.id}`} key={chat.id}>
              <ChatItem chat={chat} />
            </Link>
          ))}
        </ul>
      </ChatsWrapper>
    </>
  );
}

const ChatsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

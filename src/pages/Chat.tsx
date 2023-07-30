import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Messages from "../components/Messages";
import Prompt from "../components/Prompt";

export default function Chat() {
  const { chatId } = useParams();
  const [isFetching, setIsFetching] = useState(false);

  return (
    <ChatWrapper>
      <Messages chatId={chatId} isFetching={isFetching} />
      <Prompt chatId={chatId} isFetching={isFetching} setIsFetching={setIsFetching} />
    </ChatWrapper>
  );
}

const ChatWrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
  }
`;

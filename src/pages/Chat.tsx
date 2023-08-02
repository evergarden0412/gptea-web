import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Messages from "../components/Messages";
import Prompt from "../components/Prompt";
import { Helmet } from "react-helmet-async";
import { getChat } from "../api/gptea";
import { IChat } from "../utils/interfaces";

export default function Chat() {
  const { chatId } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [chat, setChat] = useState<IChat>();

  useEffect(() => {
    getChat(chatId).then((res) => setChat(res));
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${chat?.name || ""}  |  GPTea Chat`}</title>
      </Helmet>
      <ChatWrapper>
        <Messages chatId={chatId} isFetching={isFetching} />
        <Prompt chatId={chatId} isFetching={isFetching} setIsFetching={setIsFetching} />
      </ChatWrapper>
    </>
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

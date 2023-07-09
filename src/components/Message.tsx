import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapModalAction } from "../redux/isOpenScrapModalSlice";
import { IMessage } from "./Messages";

const MessageWrapper = styled.li`
  width: 80%;
  background-color: ${(props) => (props.role === "user" ? "transparent" : "var(--message)")};
  color: ${(props) => (props.role === "user" ? "inherit" : "white")};
  border: ${(props) => (props.role === "user" ? "1.5px solid var(--message)" : "none")};

  float: ${(props) => (props.role === "user" ? "left" : "right")};
  border-radius: 3rem;
  ${(props) => (props.role === "user" ? "border-top-left-radius: 0" : "border-bottom-right-radius:0")};
  padding: 1rem 2rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  * {
    font-size: 0.8rem;
  }
`;

const MessageContent = styled.div``;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
`;

const MessageCreatedAt = styled.div`
  display: inline-block;
  margin-right: 0.1rem;
`;

const ScrapButton = styled.button<{ $isScrap: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  i {
    font-size: 1rem;
    color: ${(props) => (props.$isScrap ? "var(--accent)" : "var(--gray)")};
  }

  &:hover i {
    color: ${(props) => (props.$isScrap ? "var(--lightaccent)" : "var(--lightgray)")};
  }
`;

interface IMessageProps {
  message: IMessage;
}

function Message({ message }: IMessageProps) {
  const dispatch = useAppDispatch();

  const handleOpenScrapModal = () => {
    if (message.scrap) dispatch(isOpenScrapModalAction.open({ message, scrapId: message.scrap.id }));
    else dispatch(isOpenScrapModalAction.open({ message }));
  };

  return (
    <MessageWrapper role={message.role} id={`${message.seq}`}>
      <MessageContent>{message.content}</MessageContent>
      <MessageInfo>
        <MessageCreatedAt>{new Date(message.createdAt).toLocaleString()}</MessageCreatedAt>
        <ScrapButton onClick={handleOpenScrapModal} $isScrap={message.scrap ? true : false}>
          <i className="fa-solid fa-bookmark"></i>
        </ScrapButton>
      </MessageInfo>
    </MessageWrapper>
  );
}

export default Message;

import styled, { css } from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapModalAction } from "../redux/isOpenScrapModalSlice";
import { IMessage } from "../utils/interfaces";

interface IMessageProps {
  message: IMessage;
}

export default function Message({ message }: IMessageProps) {
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

const MessageWrapper = styled.li`
  min-width: 51%;
  width: fit-content;
  max-width: 80%;
  border-radius: 2rem;
  padding: 1.6rem 2rem;
  margin: 1rem;

  ${(props) =>
    props.role === "user"
      ? css`
          border-top-left-radius: 0;
          background-color: transparent;
          color: inherit;
          box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);
          float: left;
        `
      : css`
          border-bottom-right-radius: 0;
          background-color: var(--message);
          color: white;
          box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.5);
          float: right;
        `};

  font-size: 1.6rem;
`;

const MessageContent = styled.div``;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
`;

const MessageCreatedAt = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
`;

const ScrapButton = styled.button<{ $isScrap: boolean }>`
  width: 1.6rem;
  height: 1.6rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  i {
    font-size: 1.6rem;
    color: ${(props) => (props.$isScrap ? "var(--accent)" : "var(--gray)")};
  }

  &:hover i {
    color: ${(props) => (props.$isScrap ? "var(--lightaccent)" : "var(--lightgray)")};
  }
`;

import styled, { css } from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapModalAction } from "../redux/isOpenScrapModalSlice";
import { IScrap } from "../utils/interfaces";

interface IScrapProps {
  scrap: IScrap;
}

export default function Scrap({ scrap }: IScrapProps) {
  const [isExpand, setIsExpand] = useState(false);
  const dispatch = useAppDispatch();

  const handleExpandScrap = () => {
    setIsExpand((prev) => !prev);
  };

  const handleOpenScrapModal = () => {
    dispatch(isOpenScrapModalAction.open({ message: scrap.message, scrapId: scrap.id }));
  };

  return (
    <ScrapWrapper isExpand={isExpand} onClick={handleExpandScrap}>
      <ScrapContent isExpand={isExpand}>{scrap.message?.content}</ScrapContent>
      <Buttons
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Button isExpand={isExpand} onClick={handleOpenScrapModal}>
          <i className="Scrap__icon--remove fa-regular fa-bookmark"></i>
        </Button>
        {isExpand && (
          <Button>
            <Link to={`/chats/${scrap.message?.chatId}#${scrap.message?.seq}`}>
              <i className="Scrap__icon--move fa-sharp fa-solid fa-share"></i>
            </Link>
          </Button>
        )}
      </Buttons>
    </ScrapWrapper>
  );
}

const ScrapWrapper = styled.li<{ isExpand: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  ${({ isExpand }) =>
    isExpand &&
    css`
      height: auto;
    `}

  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #e3e2e0;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ScrapContent = styled.div<{ isExpand: boolean }>`
  width: 90%;
  font-size: 1.6rem;

  ${(props) =>
    props.isExpand
      ? ""
      : css`
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-word;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        `}
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  cursor: auto;
`;

const Button = styled.button<{ isExpand?: boolean }>`
  width: 3rem;
  height: 3rem;
  ${(props) => props.isExpand && "margin-bottom: 1rem;"}
  border: none;
  border-radius: 1rem;
  background-color: transparent;
  cursor: pointer;

  i {
    font-size: 1.6rem;
  }

  &:hover {
    background-color: var(--white);
  }
`;

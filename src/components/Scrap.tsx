import styled from "styled-components";
import { useState } from "react";

import { IScrap } from "../pages/Scraps";
import { isOpenScrapModalAction } from "../redux/isOpenScrapModalSlice";
import { useAppDispatch } from "../redux/hooks";

const ScrapWrapper = styled.li<{ isExpand: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.isExpand ? "height: auto;" : "height: 4rem;")}
  padding: 1rem 1.5rem;
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
  ${(props) =>
    props.isExpand
      ? ""
      : `text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-word;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;`}
`;

const Buttons = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  cursor: auto;
`;

const Button = styled.button<{ isExpand?: boolean }>`
  width: 2rem;
  height: 2rem;
  ${(props) => props.isExpand && "margin-bottom: 1rem;"}
  border: none;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;

  i {
    font-size: 1rem;
  }

  &:hover {
    background-color: var(--white);
  }
`;

interface IScrapProps {
  scrap: IScrap;
}

function Scrap({ scrap }: IScrapProps) {
  const [isExpand, setIsExpand] = useState(false);
  const dispatch = useAppDispatch();

  const handleExpandScrap = () => {
    setIsExpand((prev) => !prev);
  };

  const handleOpenScrapModal = () => {
    // message 전달
    dispatch(isOpenScrapModalAction.open(scrap.message));
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
            <i className="Scrap__icon--move fa-sharp fa-solid fa-share"></i>
          </Button>
        )}
      </Buttons>
    </ScrapWrapper>
  );
}

export default Scrap;

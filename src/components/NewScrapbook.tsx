import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapbookModalAction } from "../redux/isOpenScrapbookModalSlice";

export default function NewScrapbook() {
  const dispatch = useAppDispatch();

  const handleOpenScrapbookModal = () => {
    dispatch(isOpenScrapbookModalAction.open(null));
  };

  return (
    <ScrapbookWrapper onClick={handleOpenScrapbookModal}>
      <ScrapbookTitle>+</ScrapbookTitle>
    </ScrapbookWrapper>
  );
}

const ScrapbookWrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: inline-block;
    width: 30rem;
    aspect-ratio: 3/4;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.8);
    padding: 3rem;
    margin: 1rem;
    border-radius: 2rem;
    color: white;
    cursor: pointer;
    vertical-align: top;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 3rem;
    margin-bottom: 2rem;
    border-radius: 2rem;
    color: white;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const ScrapbookTitle = styled.p`
  width: auto;
  height: auto;
  font-size: 5rem;
`;

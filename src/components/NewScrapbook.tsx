import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapbookModalAction } from "../redux/isOpenScrapbookModalSlice";

const ScrapbookWrapper = styled.div`
  display: inline-block;
  width: 15rem;
  height: 20rem;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  color: white;
  cursor: pointer;
  vertical-align: top;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ScrapbookTitle = styled.p`
  width: auto;
  height: auto;
  font-size: 3rem;
`;

function NewScrapbook() {
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

export default NewScrapbook;

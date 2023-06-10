import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapbookModalAction } from "../redux/isOpenScrapbookModalSlice";

const ScrapbookWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 20rem;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 0 2rem;
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ScrapbookTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

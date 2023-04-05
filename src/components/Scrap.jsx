import styled from 'styled-components';
import { useState } from 'react';

const ScrapWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.isExpand ? 'height: auto;' : 'height: 4rem;')}
  padding: 1rem 1.5rem;

  &:hover {
    border: none;
    border-radius: 1rem;
    background-color: var(--hover);
  }
`;

const ScrapContent = styled.div`
  width: 90%;
  ${(props) =>
    props.isExpand
      ? ''
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
`;

const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  ${(props) => props.isExpand && 'margin-bottom: 1rem;'}

  i {
    font-size: 1.5rem;
  }
`;

function Scrap({ scrap }) {
  const [isExpand, setIsExpand] = useState(false);

  const expandScrap = () => {
    setIsExpand((prev) => !prev);
  };

  return (
    <ScrapWrapper isExpand={isExpand} onClick={expandScrap}>
      <ScrapContent isExpand={isExpand}>{scrap.content}</ScrapContent>
      <Buttons>
        <Button isExpand={isExpand}>
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

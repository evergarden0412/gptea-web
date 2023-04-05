import styled from 'styled-components';

const ScrapbookWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 20rem;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 0 2rem;
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  color: white;

  &:hover {
    background-color: var(--hover);
  }
`;

const ScrapbookIcon = styled.i`
  font-size: 1.5rem;
`;

const ScrapbookTitle = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const ScrapbookColor = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: pink;
  position: absolute;
  bottom: 2rem;
`;

function Scrapbook({ scrapbook }) {
  return (
    <ScrapbookWrapper>
      <ScrapbookIcon className="Scrapbook__text--icon fa-regular fa-bookmark"></ScrapbookIcon>
      <ScrapbookTitle>{scrapbook.title}</ScrapbookTitle>
      <ScrapbookColor></ScrapbookColor>
    </ScrapbookWrapper>
  );
}

export default Scrapbook;

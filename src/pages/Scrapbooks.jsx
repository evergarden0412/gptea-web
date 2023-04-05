import styled from 'styled-components';
import dummyScrapbook from '../dummyScrapbook';
import Scrapbook from '../components/Scrapbook';
import { Link } from 'react-router-dom';

const ScrapbooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

function Scrapbooks() {
  return (
    <ScrapbooksWrapper>
      {dummyScrapbook.map((scrapbook) => (
        <Link to={`/scrapbooks/${scrapbook.id}`} key={scrapbook.id}>
          <Scrapbook scrapbook={scrapbook} />
        </Link>
      ))}
    </ScrapbooksWrapper>
  );
}

export default Scrapbooks;

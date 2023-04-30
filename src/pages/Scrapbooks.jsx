import styled from 'styled-components';
import Scrapbook from '../components/Scrapbook';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ScrapbooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

function Scrapbooks() {
  const [scrapbooks, setScrapbooks] = useState([]);

  useEffect(() => {
    fetch('/me/scrapbooks')
      .then((response) => response.json())
      .then((json) => setScrapbooks(json.scrapbooks));
  }, []);

  console.log('Scrapbooks', scrapbooks);

  return (
    <ScrapbooksWrapper>
      {scrapbooks.map((scrapbook) => (
        <Link to={`/scrapbooks/${scrapbook.id}`} key={scrapbook.id}>
          <Scrapbook scrapbook={scrapbook} />
        </Link>
      ))}
    </ScrapbooksWrapper>
  );
}

export default Scrapbooks;

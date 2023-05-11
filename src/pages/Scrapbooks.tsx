import styled from 'styled-components';
import Scrapbook from '../components/Scrapbook';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GPTEA_ACCESS_TOKEN } from './loginGptea';
import axios from 'axios';

const ScrapbooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export interface IScrapbook {
  createdAt: string;
  id: string;
  name: string;
}

function Scrapbooks() {
  const [scrapbooks, setScrapbooks] = useState<IScrapbook[]>([]);

  useEffect(() => {
    axios('/me/scrapbooks', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    }).then((res) => setScrapbooks(res.data.scrapbooks));
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

import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Scrap from '../components/Scrap';
import { useState, useEffect } from 'react';

const ScrapsWrapper = styled.div``;

function Scraps() {
  const { scrapbookId } = useParams();
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    fetch(`/me/scrapbooks/${scrapbookId}/scraps`)
      .then((response) => response.json())
      .then((json) => {
        const newScraps = json.scraps.map((scrap, index) => {
          scrap.id = index;
          return scrap;
        }); // scrap.id api에 추가될 예정
        setScraps(newScraps);
      });
  }, []);

  console.log('Scraps', scraps);

  return (
    <ScrapsWrapper>
      <ul className='Scraps__list'>
        {scraps.map((scrap) => (
          <Scrap key={scrap.id} scrap={scrap} />
        ))}
      </ul>
    </ScrapsWrapper>
  );
}

export default Scraps;

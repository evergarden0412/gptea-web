import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Scrap from '../components/Scrap';
import { useState, useEffect } from 'react';

const ScrapsWrapper = styled.div``;

interface IScrapBase {
  content: string;
  createdAt: string;
  seq: number;
  id: string;
}

interface IScrapJSON extends IScrapBase {
  chatID: string;
}

export interface IScrap extends IScrapBase {
  chatId: string;
}

function Scraps() {
  const { scrapbookId } = useParams();
  const [scraps, setScraps] = useState<IScrap[]>([]);

  useEffect(() => {
    fetch(`/me/scrapbooks/${scrapbookId}/scraps`)
      .then((response) => response.json())
      .then((json) => {
        const newScraps = json.scraps.map((scrap: IScrapJSON) => {
          return {
            chatId: scrap.chatID, // chatID in golang
            content: scrap.content,
            createdAt: scrap.createdAt,
            seq: scrap.seq,
            id: scrap.id,
          };
        });
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

import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Scrap from '../components/Scrap';
import { GPTEA_ACCESS_TOKEN } from '../utils/loginGpteaFunc';

const ScrapsWrapper = styled.div``;

export interface IScrap {
  content: string;
  createdAt: string;
  seq: number;
  id: string;
  chatID?: string;
  chatId: string;
}

function Scraps() {
  const { scrapbookId } = useParams();
  const [scraps, setScraps] = useState<IScrap[]>([]);

  useEffect(() => {
    axios(`/me/scrapbooks/${scrapbookId}/scraps`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    }).then((res) => {
      const newScraps = res.data.scraps.map((scrap: IScrap) => {
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

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getScrapsInScrapbook } from "../api/gptea";
import { IMessage } from "../components/Messages";
import Scrap from "../components/Scrap";

const ScrapsWrapper = styled.div``;

export interface IScrap {
  createdAt: string;
  id: string;
  memo: string;
  message?: IMessage;
}

function Scraps() {
  const { scrapbookId } = useParams();
  const [scraps, setScraps] = useState<IScrap[]>([]);

  useEffect(() => {
    getScrapsInScrapbook(scrapbookId).then((res) => setScraps(res));
  }, []);

  return (
    <ScrapsWrapper>
      <ul className="Scraps__list">
        {scraps.map((scrap) => (
          <Scrap key={scrap.id} scrap={scrap} />
        ))}
      </ul>
    </ScrapsWrapper>
  );
}

export default Scraps;

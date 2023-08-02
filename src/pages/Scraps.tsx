import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getScrapsInScrapbook } from "../api/gptea";
import Scrap from "../components/Scrap";
import { IScrap } from "../utils/interfaces";
import { Helmet } from "react-helmet-async";

export default function Scraps() {
  const { scrapbookId } = useParams();
  const [scraps, setScraps] = useState<IScrap[]>([]);

  useEffect(() => {
    getScrapsInScrapbook(scrapbookId).then((res) => setScraps(res));
  }, []);

  return (
    <>
      <Helmet>
        <title>Scraps | GPTea</title>
      </Helmet>
      <ScrapsWrapper>
        <ul className="Scraps__list">
          {scraps.map((scrap) => (
            <Scrap key={scrap.id} scrap={scrap} />
          ))}
        </ul>
      </ScrapsWrapper>
    </>
  );
}

const ScrapsWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

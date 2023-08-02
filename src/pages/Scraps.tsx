import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getScrapbook, getScrapsInScrapbook } from "../api/gptea";
import Scrap from "../components/Scrap";
import { IScrap, IScrapbook } from "../utils/interfaces";

export default function Scraps() {
  const { scrapbookId } = useParams();
  const [scraps, setScraps] = useState<IScrap[]>([]);
  const [scrapbook, setScrapbook] = useState<IScrapbook>();

  useEffect(() => {
    getScrapsInScrapbook(scrapbookId).then((res) => setScraps(res));
    getScrapbook(scrapbookId).then((res) => setScrapbook(res));
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${scrapbook?.name || ""}  |  GPTea Scrapbook`}</title>
      </Helmet>
      <ScrapsWrapper>
        {scraps.length === 0 ? (
          <Text>스크랩을 저장해 보세요!</Text>
        ) : (
          <ul className="Scraps__list">
            {scraps.map((scrap) => (
              <Scrap key={scrap.id} scrap={scrap} />
            ))}
          </ul>
        )}
      </ScrapsWrapper>
    </>
  );
}

const ScrapsWrapper = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
`;

const Text = styled.p`
  color: var(--gray);
  font-size: 2rem;

  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
`;

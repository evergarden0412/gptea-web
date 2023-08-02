import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import Scrapbook from "../components/Scrapbook";
import NewScrapbook from "../components/NewScrapbook";
import { Helmet } from "react-helmet-async";

export default function Scrapbooks() {
  const dispatch = useAppDispatch();
  const {
    requestGetScrapbooks: { data: scrapbooks },
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(requestGetScrapbooks());
  }, []);

  return (
    <>
      <Helmet>
        <title>Scrapbooks | GPTea</title>
      </Helmet>
      <ScrapbooksWrapper>
        <ScrapbooksSlide>
          <ScrapbooksContainer>
            {scrapbooks.map((scrapbook) => (
              <ScrapbookLink to={`/scrapbook/${scrapbook.id}`} key={scrapbook.id}>
                <Scrapbook scrapbook={scrapbook} />
              </ScrapbookLink>
            ))}
            <NewScrapbook />
          </ScrapbooksContainer>
        </ScrapbooksSlide>
      </ScrapbooksWrapper>
    </>
  );
}

const ScrapbooksWrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ScrapbooksSlide = styled.div`
  width: 100%;
  height: fit-content;
  overflow: auto;
`;

const ScrapbooksContainer = styled.div`
  @media screen and (min-width: 768px) {
    width: max-content;
    height: max-content;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const ScrapbookLink = styled(Link)`
  @media screen and (min-width: 768px) {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: top;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    aspect-ratio: 3/4;
    margin-bottom: 2rem;
  }
`;

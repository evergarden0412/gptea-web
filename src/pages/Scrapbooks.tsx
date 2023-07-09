import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import Scrapbook from "../components/Scrapbook";
import NewScrapbook from "../components/NewScrapbook";

export default function Scrapbooks() {
  const dispatch = useAppDispatch();
  const {
    requestGetScrapbooks: { data: scrapbooks },
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(requestGetScrapbooks());
  }, []);

  return (
    <ScrapbooksWrapper>
      <ScrapbooksSlide>
        <ScrapbooksContainer>
          {scrapbooks.map((scrapbook) => (
            <ScrapbookLink to={`/scrapbooks/${scrapbook.id}`} key={scrapbook.id}>
              <Scrapbook scrapbook={scrapbook} />
            </ScrapbookLink>
          ))}
          <NewScrapbook />
        </ScrapbooksContainer>
      </ScrapbooksSlide>
    </ScrapbooksWrapper>
  );
}

const ScrapbooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ScrapbooksSlide = styled.div`
  width: 100%;
  height: fit-content;
  overflow: auto;
`;

const ScrapbooksContainer = styled.div`
  width: max-content;
  height: max-content;
`;

const ScrapbookLink = styled(Link)`
  display: inline-block;
  margin-right: 1rem;
`;

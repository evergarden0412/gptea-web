import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import Scrapbook from "../components/Scrapbook";
import NewScrapbook from "../components/NewScrapbook";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";

const ScrapbooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
`;

export interface IScrapbook {
  createdAt: string;
  id: string;
  name: string;
  isDefault: boolean;
}

function Scrapbooks() {
  const dispatch = useAppDispatch();
  const {
    requestGetScrapbooks: { data: scrapbooks },
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(requestGetScrapbooks());
  }, []);

  return (
    <ScrapbooksWrapper>
      {scrapbooks.map((scrapbook) => (
        <Link to={`/scrapbooks/${scrapbook.id}`} key={scrapbook.id}>
          <Scrapbook scrapbook={scrapbook} />
        </Link>
      ))}
      <NewScrapbook />
    </ScrapbooksWrapper>
  );
}

export default Scrapbooks;

import styled from "styled-components";
import { useState } from "react";

import ScrapbookDropbox from "./ScrapbookDropbox";
import { IScrapbook } from "../utils/interfaces";

interface IScrapbookProps {
  scrapbook: IScrapbook;
}

export default function Scrapbook({ scrapbook }: IScrapbookProps) {
  const [isOpenDropbox, setIsOpenDrobpox] = useState(false);

  return (
    <ScrapbookWrapper>
      <ScrapbookIcons>
        <ScrapbookIcon className="Scrapbook__text--icon fa-regular fa-bookmark"></ScrapbookIcon>
        {!scrapbook.isDefault && (
          <ScrapbookButton
            onClick={(event) => {
              event.preventDefault();
              setIsOpenDrobpox((prev) => !prev);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
            </svg>
            {isOpenDropbox && <ScrapbookDropbox scrapbook={scrapbook} setIsOpenDrobpox={setIsOpenDrobpox} />}
          </ScrapbookButton>
        )}
      </ScrapbookIcons>
      <ScrapbookTitle>{scrapbook.isDefault ? "기본 스크랩 북" : scrapbook.name}</ScrapbookTitle>
      <ScrapbookColor></ScrapbookColor>
    </ScrapbookWrapper>
  );
}

const ScrapbookWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 20rem;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  color: white;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ScrapbookIcons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScrapbookIcon = styled.i`
  font-size: 1.5rem;
  padding: 0.3rem;
`;

const ScrapbookButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 0.3rem;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: white;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ScrapbookTitle = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const ScrapbookColor = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: pink;
  position: absolute;
  bottom: 2rem;
`;

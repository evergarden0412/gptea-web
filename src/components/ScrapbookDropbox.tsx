import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

import { useAppDispatch } from "../redux/hooks";
import { isOpenScrapbookModalAction } from "../redux/isOpenScrapbookModalSlice";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import { deleteScrapbook } from "../api/gptea";
import { toastFailToRequest, toastSuccessToDeleteScrapbook } from "../utils/toasts";
import { IScrapbook } from "../pages/Scrapbooks";

interface IScrapbookDropboxProps {
  scrapbook: IScrapbook;
  setIsOpenDrobpox: Dispatch<SetStateAction<boolean>>;
}

export default function ScrapbookDropbox({ scrapbook, setIsOpenDrobpox }: IScrapbookDropboxProps) {
  const dispatch = useAppDispatch();

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsOpenDrobpox(false);
    dispatch(isOpenScrapbookModalAction.open(scrapbook));
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    deleteScrapbook(scrapbook.id)
      .then(() => {
        toastSuccessToDeleteScrapbook();
        dispatch(requestGetScrapbooks());
      })
      .catch(() => {
        toastFailToRequest();
      });

    setIsOpenDrobpox(false);
  };

  return (
    <DropboxWrapper>
      <DropboxButton onClick={handleEdit}>edit</DropboxButton>
      <DropboxButton onClick={handleDelete}>delete</DropboxButton>
    </DropboxWrapper>
  );
}

const DropboxWrapper = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: fit-content;
  border-radius: 10px;
`;

const DropboxButton = styled.button.attrs({ type: "button" })`
  width: 100px;
  padding: 10px;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

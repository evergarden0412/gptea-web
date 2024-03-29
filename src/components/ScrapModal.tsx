import styled from "styled-components";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import { isOpenScrapModalAction } from "../redux/isOpenScrapModalSlice";
import { requestGetMessages } from "../redux/requestGetMessagesSlice";
import { addSingleScrap, createScrap, deleteAllScrap, deleteSingleScrap, getScrapParents } from "../api/gptea";
import {
  toastFailToDeleteScrap,
  toastFailToRequest,
  toastSuccessToAddScrap,
  toastSuccessToCreateScrap,
  toastSuccessToDeleteAllScrap,
  toastSuccessToDeleteScrap,
} from "../utils/toasts";
import { IMessage, IScrapbook } from "../utils/interfaces";

interface IScrapModalProps {
  message: IMessage | null;
  scrapId?: string;
}

export default function ScrapModal({ message, scrapId }: IScrapModalProps) {
  const dispatch = useAppDispatch();
  const [checkedScrapbooks, setCheckedScrapbooks] = useState<string[]>([]);

  const handleCloseScrapModal = () => dispatch(isOpenScrapModalAction.close());

  // 기존 스크랩 추가시 체크 핸들러
  const handleControlScrap = (checked: boolean, scrapbookId: string) => {
    if (checked) {
      setCheckedScrapbooks((prev) => [...prev, scrapbookId]);
      addSingleScrap(scrapId, scrapbookId)
        .then(() => toastSuccessToAddScrap())
        .catch(() => toastFailToRequest());
    } else if (checkedScrapbooks.length === 1) toastFailToDeleteScrap();
    else {
      setCheckedScrapbooks(checkedScrapbooks.filter((id) => id !== scrapbookId));
      deleteSingleScrap(scrapId, scrapbookId)
        .then(() => toastSuccessToDeleteScrap())
        .catch(() => toastFailToRequest());
    }
  };

  // 스크랩 신규 추가시 체크 핸들러
  const handleCheckInput = (checked: boolean, scrapbookId: string) => {
    if (checked) setCheckedScrapbooks((prev) => [...prev, scrapbookId]);
    else if (!checked) setCheckedScrapbooks(checkedScrapbooks.filter((id) => id !== scrapbookId));
  };

  // 스크랩 신규 추가시 로직
  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!scrapId) {
      const data = { chatID: message?.chatId, memo: "hello", seq: message?.seq, scrapbookIDs: checkedScrapbooks };
      createScrap(data)
        .then(() => {
          toastSuccessToCreateScrap();
          dispatch(requestGetMessages(message?.chatId));
          dispatch(isOpenScrapModalAction.close());
        })
        .catch(() => toastFailToRequest());
    }
  };

  const handleDeleteScrap = () => {
    deleteAllScrap(scrapId)
      .then(() => {
        toastSuccessToDeleteAllScrap();
        dispatch(requestGetMessages(message?.chatId));
        dispatch(isOpenScrapModalAction.close());
      })
      .catch(() => toastFailToRequest());
  };

  const scrapbooks = useAppSelector((state) => state.requestGetScrapbooks.data);

  useEffect(() => {
    if (scrapbooks.length === 0) dispatch(requestGetScrapbooks());
    if (scrapId) {
      getScrapParents(scrapId)
        .then((res) => setCheckedScrapbooks(res.map((scrapbook: IScrapbook) => scrapbook.id)))
        .catch(() => toastFailToRequest());
    }
  }, []);

  return (
    <ModalWrapper onClick={handleCloseScrapModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {scrapId ? (
          <>
            <Title>
              <span>추가된 Scrap</span>
            </Title>
            <Form>
              {scrapbooks.map((scrapbook) => (
                <InputLine key={scrapbook.id}>
                  <Label htmlFor={scrapbook.id}>{scrapbook.name}</Label>
                  <Input
                    type="checkbox"
                    id={scrapbook.id}
                    checked={checkedScrapbooks.includes(scrapbook.id) ? true : false}
                    onChange={(event) => handleControlScrap(event.target.checked, scrapbook.id)}
                  ></Input>
                </InputLine>
              ))}
              <DeleteButton type="button" onClick={handleDeleteScrap}>
                모든 스크랩북에서 삭제
              </DeleteButton>
            </Form>
          </>
        ) : (
          <>
            <Title>
              <span>새로운 Scrap 추가</span>
            </Title>
            <Form onSubmit={handleSubmitForm}>
              {scrapbooks.map((scrapbook) => (
                <InputLine key={scrapbook.id}>
                  <Label htmlFor={scrapbook.id}>{scrapbook.name}</Label>
                  <Input
                    type="checkbox"
                    id={scrapbook.id}
                    checked={checkedScrapbooks.includes(scrapbook.id)}
                    onChange={(event) => handleCheckInput(event.target.checked, scrapbook.id)}
                  ></Input>
                </InputLine>
              ))}
              <Button>추가</Button>
            </Form>
          </>
        )}
      </ModalBox>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 2;
    cursor: pointer;
  }
`;

const ModalBox = styled.div`
  @media screen and (min-width: 768px) {
    width: 600px;
    height: auto;
    min-height: 400px;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--white);
    cursor: auto;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 300px;
    overflow-y: auto;
    max-height: 70%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--white);
    cursor: auto;
  }
`;

const Title = styled.div`
  @media screen and (min-width: 768px) {
    font-weight: 600;
    margin-bottom: 50px;

    & span {
      font-size: 28px;
      background: linear-gradient(to top, #ffe69b 50%, transparent 50%);
      padding: 0 5px;
    }
  }

  @media screen and (max-width: 768px) {
    font-weight: 600;
    margin-bottom: 30px;

    & span {
      font-size: 2rem;
      background: linear-gradient(to top, #ffe69b 50%, transparent 50%);
      padding: 0 5px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputLine = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  @media screen and (min-width: 768px) {
    width: 250px;
    height: 50px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
  }

  @media screen and (max-width: 768px) {
    width: 250px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Input = styled.input`
  @media screen and (min-width: 768px) {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Button = styled.button`
  @media screen and (min-width: 768px) {
    width: 150px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    height: 40px;
    line-height: 40px;
    font-size: 1.6rem;
    border: none;
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  border: none;
  cursor: pointer;
  text-decoration: underline;
  background-color: transparent;

  &:hover {
    color: var(--gray);
  }
`;

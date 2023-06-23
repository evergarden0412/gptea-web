import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";
import { IScrapbook } from "../pages/Scrapbooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import { isOpenScrapModalAction } from "../redux/isOpenScrapModalSlice";
import { IMessage } from "./Messages";
import { ERROR_GET_DATA } from "../utils/errorMessage";
import { requestGetMessages } from "../redux/requestGetMessagesSlice";

const ModalWrapper = styled.div`
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
`;

const ModalBox = styled.div`
  width: 600px;
  height: 400px;
  padding: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--white);
  cursor: auto;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 50px;

  & span {
    font-size: 28px;
    background: linear-gradient(to top, #ffe69b 50%, transparent 50%);
    padding: 0 5px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputLine = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const Label = styled.label`
  width: 200px;
  min-width: fit-content;
  height: 50px;
  line-height: 50px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  font-size: 24px;
  background-color: #efefef;
  border: none;
  outline: none;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  border: none;
  cursor: pointer;
`;

interface IScrapModal {
  message?: IMessage | null;
  scrapId?: string;
}

function ScrapModal({ message, scrapId }: IScrapModal) {
  const dispatch = useAppDispatch();
  const [checkedScrapbooks, setCheckedScrapbooks] = useState<string[]>([]);

  console.log("this is message *** ", message);
  console.log("*** checkedScrapbooks", checkedScrapbooks);

  const handleCloseScrapModal = () => {
    dispatch(isOpenScrapModalAction.close());
  };

  // 기존 스크랩 추가시 체크 핸들러
  const handleControlScrap = (checked: boolean, scrapbookId: string) => {
    console.log(checked, scrapbookId);
    if (checked) {
      setCheckedScrapbooks((prev) => [...prev, scrapbookId]);
      axios(`/me/scraps/${scrapId}/scrapbooks/${scrapbookId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
        },
      }).then((res) => console.log(res));
    } else if (!checked) {
      if (checkedScrapbooks.length === 1) return; // 스크랩북 한개 이상 존재, 삭제는 별도 요청
      setCheckedScrapbooks(checkedScrapbooks.filter((id) => id !== scrapbookId));
      axios(`/me/scraps/${scrapId}/scrapbooks/${scrapbookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
        },
      }).then((res) => console.log(res));
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

    if (message) {
      axios(`/me/scraps`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
          "Content-Type": "application/json",
        },
        data: { chatID: message.chatId, memo: "hello", seq: message.seq, scrapbookIDs: checkedScrapbooks },
      }).then(() => {
        console.log("scrap added to scrapbooks.");
        dispatch(requestGetMessages(message.chatId));
        dispatch(isOpenScrapModalAction.close());
      });
    }
  };

  const {
    requestGetScrapbooks: { data: scrapbooks },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (scrapbooks.length === 0) dispatch(requestGetScrapbooks());
    if (scrapId) {
      axios(`/me/scraps/${scrapId}/scrapbooks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
        },
      })
        .then((res) => setCheckedScrapbooks(res.data.scrapbooks.map((scrapbook: IScrapbook) => scrapbook.id)))
        .catch((err) => {
          alert(`${ERROR_GET_DATA}, ${err} `);
        });
    }
  }, []);

  return (
    <ModalWrapper onClick={handleCloseScrapModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>Scrap 추가</span>
        </Title>
        {scrapId ? (
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
          </Form>
        ) : (
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
        )}
      </ModalBox>
    </ModalWrapper>
  );
}

export default ScrapModal;

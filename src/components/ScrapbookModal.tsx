import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";
import { IScrapbook } from "../pages/Scrapbooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import { isOpenScrapbookModalAction } from "../redux/isOpenScrapbookModalSlice";
import { toastFailToRequest, toastSuccessToCreateScrapbook, toastSuccessToModifyScrapbookName } from "../utils/toasts";

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

interface IScrapbookModal {
  scrapbook: IScrapbook | null;
}

function ScrapbookModal({ scrapbook }: IScrapbookModal) {
  const dispatch = useAppDispatch();
  const [scrapbookName, setScrapbookName] = useState(scrapbook ? scrapbook.name : "");

  const handleCloseScrapbookModal = () => {
    dispatch(isOpenScrapbookModalAction.close());
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScrapbookName(event.target.value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (scrapbook)
      axios(`/me/scrapbooks/${scrapbook.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
        data: { name: scrapbookName },
      })
        .then(() => {
          toastSuccessToModifyScrapbookName();
          setScrapbookName("");
          dispatch(requestGetScrapbooks());
          dispatch(isOpenScrapbookModalAction.close());
        })
        .catch((error) => {
          console.log(error);
          toastFailToRequest();
        });
    else
      axios("/me/scrapbooks", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
        data: { name: scrapbookName },
      })
        .then(() => {
          toastSuccessToCreateScrapbook();
          setScrapbookName("");
          dispatch(requestGetScrapbooks());
          dispatch(isOpenScrapbookModalAction.close());
        })
        .catch((error) => {
          console.log(error);
          toastFailToRequest();
        });
  };

  return (
    <ModalWrapper onClick={handleCloseScrapbookModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>Scrapbook 추가</span>
        </Title>
        <Form onSubmit={handleSubmitForm}>
          <InputLine>
            <Label>스크랩북 이름</Label>
            <Input
              placeholder="스크랩북 이름을 입력하세요."
              value={scrapbookName}
              onChange={handleChangeInput}
              autoComplete="false"
            ></Input>
          </InputLine>

          <Button>submit</Button>
        </Form>
      </ModalBox>
    </ModalWrapper>
  );
}

export default ScrapbookModal;

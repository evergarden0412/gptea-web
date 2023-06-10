import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";
import { IScrapbook } from "../pages/Scrapbooks";
import { requestGetScrapbooks } from "../redux/requestGetScrapbooksSlice";
import { isOpenScrapbookModalAction } from "../redux/isOpenScrapbookModalSlice";

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalBox = styled.div`
  width: 50%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
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
        .then((res) => {
          console.log(res);
          setScrapbookName("");
          dispatch(requestGetScrapbooks());
          dispatch(isOpenScrapbookModalAction.close());
        })
        .catch((error) => console.log(error));
    else
      axios("/me/scrapbooks", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
        data: { name: scrapbookName },
      })
        .then((res) => {
          console.log(res);
          setScrapbookName("");
          dispatch(requestGetScrapbooks());
          dispatch(isOpenScrapbookModalAction.close());
        })
        .catch((error) => console.log(error));
  };

  return (
    <ModalWrapper onClick={handleCloseScrapbookModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmitForm}>
          <label>scrapbook name</label>
          <input placeholder="스크랩북 이름을 입력하세요." value={scrapbookName} onChange={handleChangeInput} autoComplete="false"></input>
          <button>submit</button>
        </form>
      </ModalBox>
    </ModalWrapper>
  );
}

export default ScrapbookModal;

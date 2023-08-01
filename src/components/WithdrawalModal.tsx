import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/isLoggedInSlice";
import { isOpenWithdrawalModalAction } from "../redux/isOpenWithdrawalModalSlice";
import { deleteGpteaAccount } from "../api/gpteaAuth";
import { toastFailToRequest, toastFailToWithdrawal, toastLogout, toastSuccessToWithdrawal } from "../utils/toasts";
import { kakaoLogin } from "../pages/Login";

export default function WithdrawalModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleCloseWithdrawalModal = () => {
    dispatch(isOpenWithdrawalModalAction.close());
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleUnregister = async () => {
    try {
      await kakaoLogin.API.request({ url: "/v1/user/unlink" });
      await deleteGpteaAccount();
      localStorage.clear();
      toastSuccessToWithdrawal();
      dispatch(isOpenWithdrawalModalAction.close());

      toastLogout();
      dispatch(logout());
      navigate("/");
    } catch {
      toastFailToRequest();
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input !== "delete my account") toastFailToWithdrawal();
    else handleUnregister();
  };

  return (
    <ModalWrapper onClick={handleCloseWithdrawalModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>계정 삭제</span>
        </Title>
        <Form onSubmit={handleSubmitForm}>
          <InputLine>
            <Label htmlFor="input">다음 문구를 입력하세요</Label>
            <Label>delete my account</Label>
            <Input
              id="input"
              placeholder="delete my account"
              value={input}
              onChange={handleChangeInput}
              autoComplete="off"
            ></Input>
          </InputLine>
          <Button>확인</Button>
        </Form>
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
    align-items: center;
    z-index: 2;
    cursor: pointer;
  }
`;

const ModalBox = styled.div`
  @media screen and (min-width: 768px) {
    width: 600px;
    height: 400px;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--white);
    cursor: auto;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 300px;
    padding: 30px;
    border-radius: 10px;
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
      font-size: 1.6rem;
      background: linear-gradient(to top, #ffe69b 50%, transparent 50%);
      padding: 0 5px;
    }
  }

  @media screen and (max-width: 768px) {
    font-weight: 600;
    margin-bottom: 20px;

    & span {
      font-size: 1.6rem;
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
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  @media screen and (min-width: 768px) {
    width: 150px;
    min-width: fit-content;
    text-align: center;

    &:last-of-type {
      color: var(--red);
      margin-bottom: 40px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    min-width: fit-content;
    font-size: 1.6rem;

    &:last-of-type {
      color: var(--red);
      margin-bottom: 30px;
    }
  }
`;

const Input = styled.input`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 1.6rem;
    border: none;
    outline: none;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    font-size: 1.6rem;
    border: none;
    outline: none;
    text-align: center;
  }
`;

const Button = styled.button`
  @media screen and (min-width: 768px) {
    width: 150px;
    height: 50px;
    line-height: 50px;
    font-size: 1.6rem;
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

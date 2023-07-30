import styled from "styled-components";
import { useEffect } from "react";

import kakaoLoginLogo from "../asset/kakao_login_logo.png";
import chats from "../asset/chats.gif";
import scraps from "../asset/scraps.gif";

const naverLogin = new window.naver.LoginWithNaverId({
  clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
  callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
  isPopup: false,
  loginButton: {
    color: "green",
    type: 3,
    height: 50,
  },
});

const kakaoLogin = window.Kakao;

export default function Login() {
  useEffect(() => {
    if (!kakaoLogin.isInitialized()) kakaoLogin.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const handleKakaoLogin = () => {
    kakaoLogin.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_CALLBACK_URL,
    });
  };

  return (
    <Wrapper>
      <TextContainer>
        <Text>Welcome to Gptea</Text>
        <Text>Let's have a teatime !</Text>
      </TextContainer>
      <DiscriptionContainer>
        <ImageContainer>
          <Image src={chats} />
          <Image src={scraps} />
        </ImageContainer>
        <Discription>
          <p>Ask to smart AI and you will find the answer.</p>
          <p>Scrap your message, strengthen your knowledge. </p>
        </Discription>
      </DiscriptionContainer>
      <ButtonContainer>
        <Button id="kakaoIdLogin" onClick={handleKakaoLogin}>
          <img src={kakaoLoginLogo} />
        </Button>
      </ButtonContainer>
      <Svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
        <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z" />
      </Svg>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 100vw;
    height: 100vh;
    padding: 100px;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(0, 0, 0, 0.9);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    min-height: 100vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const TextContainer = styled.div`
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Text = styled.h1`
  color: white;
  z-index: 1;
`;

const DiscriptionContainer = styled.div`
  z-index: 1;

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ImageContainer = styled.div`
  @media screen and (min-width: 768px) {
    z-index: 1;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Image = styled.img`
  @media screen and (min-width: 768px) {
    min-width: 300px;
    width: 30%;
    height: auto;
    z-index: 1;
    margin-bottom: 1rem;

    &:first-of-type {
      margin-right: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Discription = styled.div`
  color: white;
  font-weight: 500;
`;

const Svg = styled.svg`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 50vh;
  height: 50vh;

  fill: rgba(255, 255, 255, 0.5);
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 450px;
  justify-content: space-between;
  z-index: 1;
`;

const Button = styled.div`
  cursor: pointer;
`;

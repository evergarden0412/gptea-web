import styled from "styled-components";
import { useEffect } from "react";

import kakaoLoginLogo from "../asset/kakao_login_logo.png";
import chats from "../asset/chats.gif";
import scraps from "../asset/scraps.gif";
import coffeeIcon from "../asset/coffee.svg";
import { Helmet } from "react-helmet-async";

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

export const kakaoLogin = window.Kakao;

export default function Login() {
  useEffect(() => {
    if (!kakaoLogin.isInitialized()) kakaoLogin.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const handleKakaoLogin = () => {
    kakaoLogin.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_CALLBACK_URL,
      prompts: "login",
    });
  };

  return (
    <>
      <Helmet>
        <title>GPTea</title>
      </Helmet>
      <Wrapper>
        <TextContainer>
          <Text>Welcome to Gptea</Text>
          <Text>Let's have a teatime !</Text>
        </TextContainer>
        <DiscriptionContainer>
          <ImageContainer>
            <Image src={chats} alt="introduce-GPTea-chat" width="600px" height="400px" />
            <Image src={scraps} alt="introduce-GPTea-scrap" width="600px" height="400px" />
          </ImageContainer>
          <Discription>
            <p>Ask to smart AI and you will find the answer.</p>
            <p>Scrap your message, strengthen your knowledge. </p>
          </Discription>
        </DiscriptionContainer>
        <ButtonContainer>
          <Button id="kakaoIdLogin" onClick={handleKakaoLogin}>
            <img src={kakaoLoginLogo} alt="Kakao-login-button" width="183px" height="45px" />
          </Button>
        </ButtonContainer>
        <Icon src={coffeeIcon} />
      </Wrapper>
    </>
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
    height: auto;
    aspect-ratio: 3/2;
    margin-bottom: 1rem;
  }
`;

const Discription = styled.div`
  color: white;
  font-weight: 500;
`;

const Icon = styled.img`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 50vh;
  height: 50vh;

  filter: brightness(0) saturate(100%) invert(82%) sepia(3%) saturate(9%) hue-rotate(50deg) brightness(90%)
    contrast(89%);
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

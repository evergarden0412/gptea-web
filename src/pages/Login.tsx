import { useEffect } from "react";

import kakaoLoginLogo from "../asset/kakao_login_logo.png";

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

function Login() {
  useEffect(() => {
    naverLogin.init();
    if (!kakaoLogin.isInitialized()) kakaoLogin.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const handleKakaoLogin = () => {
    kakaoLogin.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_CALLBACK_URL,
    });
  };

  return (
    <div className="welcome">
      <h1>Welcome</h1>
      <div id="naverIdLogin" />
      <div id="kakaoIdLogin" onClick={handleKakaoLogin}>
        <img src={kakaoLoginLogo} />
      </div>
    </div>
  );
}

export default Login;

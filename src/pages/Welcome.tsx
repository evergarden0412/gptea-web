import { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const naverLogin = new window.naver.LoginWithNaverId({
  clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
  callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
  isPopup: false,
  loginButton: {
    color: 'green',
    type: 3,
    height: 50,
  },
});

function Welcome() {
  useEffect(() => {
    naverLogin.init();
  }, []);

  return (
    <div className='welcome'>
      <h1>Welcome</h1>
      <div id='naverIdLogin' />
    </div>
  );
}

export default Welcome;

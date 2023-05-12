import axios from 'axios';
import { NAVER_ACCESS_TOKEN } from './LoggedinNaver';
import { KAKAO_ACCESS_TOKEN } from './LoggedinKakao';
import { GPTEA_ACCESS_TOKEN } from './loginGptea';

export const handleNaverLogout = () => {
  axios(
    `/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_NAVER_SECRET_KEY}
      &access_token=${localStorage.getItem(NAVER_ACCESS_TOKEN)}
      &service_provider=NAVER`
  )
    .then(() => {
      localStorage.removeItem(NAVER_ACCESS_TOKEN);
    })
    .catch((err) => console.log('eee', err));
};

export const handleKakaoLogout = () => {
  if (!localStorage.getItem(KAKAO_ACCESS_TOKEN)) {
    console.log('not logged in.');
    return;
  }

  axios('https://kapi.kakao.com/v1/user/logout', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem(KAKAO_ACCESS_TOKEN)}`,
    },
  })
    .then(() => {
      localStorage.removeItem(KAKAO_ACCESS_TOKEN);
    })
    .catch((err) => console.log('error!', err));
};

export const handleGpteaLogout = () => {
  localStorage.removeItem(GPTEA_ACCESS_TOKEN);
  alert('logged out!');
  // setIsLoggedIn(false); 전역상태로
};

export const handleLogout = () => {
  if (localStorage.getItem(NAVER_ACCESS_TOKEN)) {
    handleNaverLogout();
  } else if (localStorage.getItem(KAKAO_ACCESS_TOKEN)) {
    handleKakaoLogout();
  }
  handleGpteaLogout();
};

import axios from 'axios';

import { NAVER_ACCESS_TOKEN } from '../pages/NaverLogin';
import { KAKAO_ACCESS_TOKEN } from '../pages/KakaoLogin';
import { GPTEA_ACCESS_TOKEN } from './loginGpteaFunc';

export const removeNaverToken = () => {
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

export const removeKakaoToken = () => {
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

export const removeGpteaToken = () => {
  localStorage.removeItem(GPTEA_ACCESS_TOKEN);
};

export const logoutGptea = () => {
  if (localStorage.getItem(NAVER_ACCESS_TOKEN)) {
    removeNaverToken();
  } else if (localStorage.getItem(KAKAO_ACCESS_TOKEN)) {
    removeKakaoToken();
  }
  removeGpteaToken();
  alert('logged out!');
};

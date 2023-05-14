import axios from 'axios';

import { ERROR_GET_GPTEA_TOKENS, ERROR_REGISTER_IN_GPTEA } from './errorMessage';

export const GPTEA_ACCESS_TOKEN = 'gptea_access_token';

const registerInGptea = (accessToken: string, social: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios('/auth/cred/register', { method: 'POST', data: { accessToken, cred: social } })
      .then(() => {
        console.log('registering');
        resolve();
      })
      .catch((error) => {
        console.log({ ERROR_REGISTER_IN_GPTEA, error });
        reject();
      });
  });
};

export const getGpteaToken = (accessToken: string, social: string): Promise<void | string> => {
  return new Promise((resolve, reject) => {
    axios('/auth/cred/sign-in', { method: 'POST', data: { accessToken, cred: social } })
      .then((res) => {
        const { accessToken } = res.data;
        if (!localStorage.getItem(GPTEA_ACCESS_TOKEN)) {
          localStorage.setItem(GPTEA_ACCESS_TOKEN, accessToken);
        }
        console.log('getting access token');
        resolve();
        // setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log({ ERROR_GET_GPTEA_TOKENS, err });
        registerInGptea(accessToken, social)
          .then(() => {
            getGpteaToken(accessToken, social).then(() => resolve());
          })
          .catch(() => reject(ERROR_GET_GPTEA_TOKENS));
      });
  });
};

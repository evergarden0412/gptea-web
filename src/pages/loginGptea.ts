import { ERROR_GET_GPTEA_TOKENS, ERROR_REGISTER_IN_GPTEA } from '../errors';

export const GPTEA_ACCESS_TOKEN = 'gptea_access_token';

const registerInGptea = (accessToken: string, social: string): Promise<void | string> => {
  return new Promise((resolve, reject) => {
    fetch('/auth/cred/register', { method: 'POST', body: JSON.stringify({ accessToken, cred: social }) })
      .then((response) => {
        if (response.status === 200) {
          resolve();
          getGpteaToken(accessToken, social);
        } else throw new Error(ERROR_REGISTER_IN_GPTEA);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getGpteaToken = (accessToken: string, social: string): Promise<void | string> => {
  return new Promise((resolve, reject) => {
    fetch('/auth/cred/sign-in', { method: 'POST', body: JSON.stringify({ accessToken, cred: social }) })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else throw new Error(ERROR_GET_GPTEA_TOKENS);
      })
      .then((json) => {
        if (!localStorage.getItem(GPTEA_ACCESS_TOKEN)) {
          localStorage.setItem(GPTEA_ACCESS_TOKEN, json.accessToken);
        }
        resolve();
        // setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        registerInGptea(accessToken, social).catch((error) => reject(error));
      });
  });
};

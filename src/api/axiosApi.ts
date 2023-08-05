import axios from "axios";
import { GPTEA_ACCESS_TOKEN, GPTEA_EXPIRES_IN, setGpteaTokenInStorage } from "../utils/util";
import { recreateGpteaToken } from "./gpteaAuth";
import store from "../redux/store";
import { logout } from "../redux/isLoggedInSlice";
import { toastLogout } from "../utils/toasts";
import { redirect } from "react-router-dom";

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/" : "https://api.gptea-test.keenranger.dev",
}); // interceptor 사용 안하는 요청

export const apiWithAuth = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/" : "https://api.gptea-test.keenranger.dev",
});

apiWithAuth.interceptors.request.use(
  (config) => {
    if (Number(localStorage.getItem(GPTEA_EXPIRES_IN)) < Date.now() / 1000 + 60)
      recreateGpteaToken()
        .then((res) => {
          const { accessToken, refreshToken } = res;
          setGpteaTokenInStorage(accessToken, refreshToken);
          console.log("tokens regenerated.");
        })
        .catch(() => {
          store.dispatch(logout());
          localStorage.clear();
          redirect("/");
          toastLogout();
        });

    config.headers.Authorization = `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`;

    return config;
  },
  (error) => {
    console.log(error);
  }
);

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/isLoggedInSlice";
import { generateGpteaToken } from "./KakaoLogin";

const NAVER = "naver";
export const NAVER_ACCESS_TOKEN = "naver_access_token";

export default function NaverLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const naverAccessToken = window.location.href.split("=")[1].split("&")[0]; // 리렌더링되기 때문에 useEffect안으로 이동
    if (naverAccessToken) {
      // gptea login api에 전달 예정
      if (!localStorage.getItem(NAVER_ACCESS_TOKEN)) localStorage.setItem(NAVER_ACCESS_TOKEN, naverAccessToken);
      generateGpteaToken(naverAccessToken, NAVER)
        .then(() => {
          dispatch(login());
          navigate("/");
        })
        .catch((err) => alert(err));
    }
  }, []);

  return <></>;
}

import axios from "axios";
import { KAKAO_USER_ID } from "../pages/KakaoLogin";

export const unlinkKakaoAccount = async () => {
  await axios({
    url: `https://kapi.kakao.com/v1/user/unlink?target_id_type=user_id&target_id=${JSON.parse(
      localStorage.getItem(KAKAO_USER_ID) || ""
    )}`,
    method: "POST",
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

import axios from "axios";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";

/* login */

/* register */
export const deleteGpteaAccount = async () => {
  await axios({
    url: "/me",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
};

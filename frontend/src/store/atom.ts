import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

//for async selectorFamily is used
export const userAtomFamily = atomFamily({
  key: "userAtomFamily",
  default: selectorFamily({
    key: "userAtomFamily",
    get: () => async () => {
      const res = await axios.get(
        `https://backend.himanshurajhr8.workers.dev/api/v1/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data.user;
    },
  }),
});

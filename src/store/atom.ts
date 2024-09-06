import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: {
    user: null,
    isLogin: false,
  },
effects_UNSTABLE: [persistAtom],
})

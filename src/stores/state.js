import { USER_KEY } from "../constant/userKey";
import { useLocalStorage } from "../utils/useLocalStorage";

const { getLocalStorage } = useLocalStorage();

export const state = {
  // isLoggedIn: false,
  userInfo: getLocalStorage(USER_KEY),
};

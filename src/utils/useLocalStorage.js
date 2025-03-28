import { ERROR_MESSAGE } from "../constant/message";

export const useLocalStorage = () => {
  const setLocalStorage = (key, userInfo) => {
    try {
      localStorage.setItem(key, JSON.stringify(userInfo));
    } catch {
      alert("error", ERROR_MESSAGE.SET_LOCALSTORAGE);
    }
  };

  const getLocalStorage = (key) => {
    try {
      const item = localStorage.getItem(key);
      return JSON.parse(item);
    } catch {
      alert("error", ERROR_MESSAGE.GET_LOCALSTORAGE);
    }
  };

  const removeLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      alert("error", ERROR_MESSAGE.REMOVE_LOCALSTORAGE);
    }
  };

  return { setLocalStorage, getLocalStorage, removeLocalStorage };
};

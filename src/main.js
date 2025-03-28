// TODO: 로그인 라우터별 이벤트 리스너 맞게 변경하기
import Error from "./pages/Error";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

import { state } from "./stores/state";
import { useLocalStorage } from "./utils/useLocalStorage";

//TODO: localstorage에서 받아오는 user정보도 기본state로 만들 수 있도록 state.isLoggedIn은 로컬스토리지의 값으로 판별할 수 있을 것 같음
// 스토어 컴포넌트 함수 라우트

const { setLocalStorage, getLocalStorage, removeLocalStorage } =
  useLocalStorage();

const App = () => {
  if (location.pathname === "/") {
    return Main();
  }
  if (location.pathname === "/login") {
    if (!state.userInfo) {
      return Login();
    }
    if (state.userInfo.username !== "") {
      history.pushState(null, "", "/");
      window.dispatchEvent(new Event("popstate"));

      return Main();
    }
  }

  if (location.pathname === "/profile") {
    if (state.userInfo) {
      return Profile();
    } else {
      state.userInfo = null;
      history.pushState(null, "", "/login");
      window.dispatchEvent(new Event("popstate"));
      return Login();
    }
  }
  return Error();
};

const render = () => {
  document.querySelector("#root").innerHTML = App();

  const $ul = document.querySelector("ul");
  const $loginForm = document.getElementById("login-form");
  const $usernameInput = document.getElementById("username");
  const $logoutButton = document.getElementById("logout");

  if ($ul) {
    $ul.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName === "A" && e.target.id !== "logout") {
          e.preventDefault();
          const href = e.target.getAttribute("href");
          history.pushState(null, "", href);
          window.dispatchEvent(new Event("popstate"));
        }
      },
      false,
    );
  }

  if ($loginForm) {
    $loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if ($usernameInput.value !== "") {
        setLocalStorage("user", {
          username: $usernameInput.value,
          email: "",
          bio: "",
        });
        state.userInfo = getLocalStorage("user");
        history.pushState(null, "", "/profile");
        window.dispatchEvent(new Event("popstate"));
      } else {
        alert("아이디 필수");
      }
    });
  }

  if ($logoutButton) {
    $logoutButton.addEventListener("click", () => {
      history.pushState(null, "", "/login");
      window.dispatchEvent(new Event("popstate"));
      state.userInfo = null;
      removeLocalStorage("user");
    });
  }

  if (location.pathname === "/profile") {
    const $profileForm = document.getElementById("profile-form");
    const $username = document.getElementById("username");
    const $email = document.getElementById("email");
    const $bio = document.getElementById("bio");

    $username.value = state.userInfo.username;
    $email.value = state.userInfo.email;
    $bio.value = state.userInfo.bio;

    $profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setLocalStorage("user", {
        username: $username.value,
        email: $email.value,
        bio: $bio.value,
      });

      alert("프로필이 업데이트 되었습니다.");
    });
  }
};

window.addEventListener("popstate", () => {
  render();
});

render();

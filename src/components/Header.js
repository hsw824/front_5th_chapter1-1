const textHighlighter = (href) => {
  if (location.pathname === href) return "text-blue-600 font-bold";
  return "text-gray-600";
};

const Header = ({ isLoggedIn }) => {
  const nav = isLoggedIn
    ? `
        <li><a href="/profile" class="${textHighlighter("/profile")}">프로필</a></li>
        <li><a href="/login" class="text-gray-600" id="logout">로그아웃</a></li>
      `
    : `
      <li><a href="/login" class="text-gray-600">로그인</a></li>
      `;

  return /* HTML */ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${textHighlighter("/")}">홈</a></li>
        ${nav}
      </ul>
    </nav>
  `;
};

export default Header;

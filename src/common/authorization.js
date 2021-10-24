import decode from "jwt-decode";

const JWT = "Token";

// cache JWT in localStorage
const setToken = (token) => {
  localStorage.setItem(JWT, token);
};

// read local JWT
const getToken = () => {
  return localStorage.getItem(JWT);
};

const isLogin = () => {
  const jwToken = getToken();
  return jwToken && !isTokenExpired(jwToken);
};

const isTokenExpired = (token) => {
  try {
    const info = decode(token);
    return (info.exp < Date.now() / 1000)
  } catch (error) {
    return false;
  }
};

const getUser = () => isLogin() ? decode(getToken()) : null;

const logout = () => localStorage.removeItem(JWT);

global.auth = {
  setToken,
  getToken,
  getUser,
  isLogin,
  logout,
};

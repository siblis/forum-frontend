const TOKEN_NAME = 'user-token';

export const getTokenAuthHeaderValue = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  return token ? `Bearer ${token}` : null;
};

export const getToken = () => localStorage.getItem(TOKEN_NAME);

export const setToken = token => localStorage.setItem(TOKEN_NAME, token);

export const removeToken = () => localStorage.removeItem(TOKEN_NAME);

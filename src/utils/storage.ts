const storagePrefix = 'mantis_';
const tokenKey = `${storagePrefix}token`;

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(tokenKey) ?? 'null') as { [key: string]: string };
  },
  setToken: (token: string) => {
    window.localStorage.setItem(tokenKey, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(tokenKey);
  },
};

export default storage;

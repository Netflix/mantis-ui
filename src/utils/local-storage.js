const USER_NAME_KEY = 'mantisUserName';
const USER_EMAIL_KEY = 'mantisUserEmail';
const MANTIS_MASTERS_KEY = 'mantisMasters';
const MESOS_URL_KEY = 'mesosUrl';

export function getUserName() {
  return localStorage.getItem(USER_NAME_KEY);
}

export function getUserEmail() {
  return localStorage.getItem(USER_EMAIL_KEY);
}

export function getMantisMasters() {
  const mastersString = localStorage.getItem(MANTIS_MASTERS_KEY);
  try {
    return JSON.parse(mastersString);
  } catch (e) {
    return [];
  }
}

export function getMesosUrl() {
  return localStorage.getItem(MESOS_URL_KEY);
}

export function setUserName(userName) {
  return localStorage.setItem(USER_NAME_KEY, userName);
}

export function setUserEmail(userEmail) {
  return localStorage.setItem(USER_EMAIL_KEY, userEmail);
}

export function setMantisMasters(masters) {
  return localStorage.setItem(MANTIS_MASTERS_KEY, JSON.stringify(masters));
}

export function setMesosUrl(mesosUrl) {
  return localStorage.setItem(MESOS_URL_KEY, mesosUrl);
}

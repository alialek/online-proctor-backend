import authHeader from './authHeader';
import axios from 'axios';

const apiUrl = 'https://app.netquest.ru';

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${apiUrl}/api/auth`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the respons
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

async function getUserQuestsByID() {
  return await axios.get(`${apiUrl}/api/users/quests`, {
    headers: authHeader()
  });
}

function gameRegister(questID) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/api/quest/` + questID, requestOptions);
}

function register(name, email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  };

  return fetch(`${apiUrl}/api/users`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function handleResponse(response) {
  return response.json().then(data => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api

        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const userService = {
  login,
  logout,
  register,
  getUserQuestsByID,
  gameRegister
};

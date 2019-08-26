import authHeader from './authHeader';
import axios from 'axios';

const apiUrl = 'https://app.netquest.ru';

async function getEvents() {
  return await axios.get(`${apiUrl}/api/quest`);
}

//Продумать ответ, если пользователь неавторизован
async function getEventByID(id) {
  return await axios.get(`${apiUrl}/api/quest/` + id, {
    headers: authHeader()
  });
}

//На будущее - вариант квеста с решением загадок на скорость, когда доступны все сразу (в высоком качестве без регистрации и СМС)
async function getEventByIDAndRiddles(id) {
  return await axios.get(`${apiUrl}/api/quest/` + id + '?riddles');
}

//Получить одну загадку
async function getRiddle(questID, riddleID) {
  return await axios.get(`${apiUrl}/api/quest/` + questID + '/' + riddleID, {
    headers: authHeader()
  });
}

function postAnswer(questID, riddleID, answer) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ answer })
  };

  return fetch(
    `${apiUrl}/api/quest/` + questID + '/' + riddleID,
    requestOptions
  );
}

export const questService = {
  getEvents,
  getEventByID,
  getEventByIDAndRiddles,
  getRiddle,
  postAnswer
};

# online-proctor-backend
Node.js API сервер для системы тестирования. Frontend лежит [тут](https://github.com/alialek/online-proctor)

Стэк:
 - Node.js
 - Express
 - MongoDB
 - WebSockets

Для запуска указать следующие значения в файле config/default.json
 - mongoURI - ссылка на подключение к MongoDB, можно использовать https://cloud.mongodb.com/
 - jwtSecret - секрет для формирования JWT-токена
 - apiUrl - необязательно, домен, к которому привязан сервер

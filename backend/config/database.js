const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'stas_ganiev',         // Замените на имя вашего пользователя MySQL (например, root)
  password: 'Qwerty123', // Замените на пароль пользователя MySQL
  database: 'boardgame_rental'
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключение к базе данных установлено');
  }
});

module.exports = db;

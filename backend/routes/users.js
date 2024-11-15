const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const router = express.Router();

// Маршрут для регистрации
router.post('/register', async (req, res) => {
  console.log('Request body:', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Введите имя пользователя и пароль' });
  }

  try {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраняем пользователя в базе данных
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Имя пользователя уже занято' });
          }
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');

// Маршрут для авторизации
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Введите имя пользователя и пароль' });
  }

  // Поиск пользователя в базе данных
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
    }

    const user = results[0];

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
    }

    // Создание токена
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ message: 'Авторизация успешна', token });
  });
});

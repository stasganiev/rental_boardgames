const express = require('express');
const db = require('../config/database');
const authenticateToken = require('./authMiddleware');
const router = express.Router();

// Получение всех игр
router.get('/', (req, res) => {
  db.query('SELECT * FROM games', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Добавление новой игры
router.post('/', authenticateToken, (req, res) => {
    const { title, description, rental_price, deposit, availability } = req.body;

    // Проверка, что обязательные поля заполнены
    if (!title || !rental_price || !deposit) {
        return res.status(400).json({ error: 'Пожалуйста, заполните все обязательные поля.' });
    }

    const query = 'INSERT INTO games (title, description, rental_price, deposit, availability) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, rental_price, deposit, availability || true];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Игра успешно добавлена', gameId: results.insertId });
    });
});

// Обновление информации об игре
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, description, rental_price, deposit, availability } = req.body;
  
    const query = 'UPDATE games SET title = ?, description = ?, rental_price = ?, deposit = ?, availability = ? WHERE id = ?';
    const values = [title, description, rental_price, deposit, availability, id];
  
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Игра не найдена' });
      }
      res.json({ message: 'Игра успешно обновлена' });
    });
});

// Удаление игры
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM games WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Игра не найдена' });
      }
      res.json({ message: 'Игра успешно удалена' });
    });
});

module.exports = router;

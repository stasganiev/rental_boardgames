const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Получение всех игр
router.get('/', (req, res) => {
  db.query('SELECT * FROM games', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;

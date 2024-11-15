const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const gamesRoutes = require('./routes/games');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('API работает');
});

// Подключение маршрутов
app.use('/api/games', gamesRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

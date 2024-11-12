const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./config/database');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API работает');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

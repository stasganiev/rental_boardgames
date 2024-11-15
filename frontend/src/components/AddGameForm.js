import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const AddGameForm = ({ onGameAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [availability, setAvailability] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGame = { title, description, rental_price: rentalPrice, deposit, availability };

    fetch('http://localhost:5001/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame),
    })
      .then((response) => response.json())
      .then((data) => {
        onGameAdded(data); // обновить список игр
        setTitle('');
        setDescription('');
        setRentalPrice('');
        setDeposit('');
        setAvailability(true);
      })
      .catch((error) => console.error('Ошибка при добавлении игры:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить новую игру</h2>
      <div>
        <TextField
          label="Название игры"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Описание"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Добавить игру
      </Button>
    </form>
  );
};

export default AddGameForm;

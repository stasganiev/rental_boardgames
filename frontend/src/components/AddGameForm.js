import React, { useState } from 'react';

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
        <label>Название игры:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Описание:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Цена аренды (€):</label>
        <input type="number" value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} required />
      </div>
      <div>
        <label>Залог (€):</label>
        <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} required />
      </div>
      <div>
        <label>Доступность:</label>
        <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
      </div>
      <button type="submit">Добавить игру</button>
    </form>
  );
};

export default AddGameForm;

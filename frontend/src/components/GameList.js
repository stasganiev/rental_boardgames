import React, { useEffect, useState } from 'react';

const GameList = () => {
  const [games, setGames] = useState([]);

  // Получение списка игр с сервера
  useEffect(() => {
    fetch('http://localhost:5001/api/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Ошибка при получении списка игр:', error));
  }, []);

  return (
    <div>
      <h2>Доступные игры</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <p>Цена аренды: {game.rental_price} €</p>
            <p>Залог: {game.deposit} €</p>
            <p>Доступность: {game.availability ? 'Доступна' : 'Недоступна'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;

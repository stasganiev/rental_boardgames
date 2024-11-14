import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import GameList from './components/GameList';
import AddGameForm from './components/AddGameForm';

function App() {
  const [games, setGames] = useState([]);

  // Обновление списка игр после добавления новой
  const handleGameAdded = (newGame) => {
    setGames([...games, newGame]);
  };
  
  return (
    <div className="App">
      <h1>Аренда настольных игр</h1>
      <AddGameForm onGameAdded={handleGameAdded} />
      <GameList games={games} />
    </div>
  );
}

export default App;

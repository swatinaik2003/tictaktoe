import React, { useState } from 'react';
import './Tictactoe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(16).fill(null)); // 3x3 board initialized to null
  const [isONext, setIsONext] = useState(true); // Track whose turn it is
  const [scores, setScores] = useState({ X: 0, O: 0 }); // Track scores for each player
  const [winner, setWinner] = useState(null); // Track the winner

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore clicks if cell is filled or game is won

    const newBoard = [...board];
    newBoard[index] = isONext ? 'O' : 'X';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prevScores => ({ ...prevScores, [gameWinner]: prevScores[gameWinner] + 1 }));
    }

    setIsONext(!isONext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 4, 8, 9, 10], [1, 5, 9, 10, 11], [4, 8, 12, 13, 14], [5, 9, 13, 14, 15], // Rows
      [0, 1, 2, 6, 10], [1, 2, 3, 7, 11], [4, 5, 6, 10, 14], [5, 6, 7, 11, 15],// Columns
      [8, 4, 0, 1, 2], [9, 5, 1, 2, 3], [12, 8, 4, 5, 6], [13, 9, 5, 6, 7], [11, 7, 3, 2, 1], [10, 6, 2, 1, 0], 
      [15, 11, 7, 6, 5], [4, 10, 6, 5, 4], [3, 7, 11, 10, 9],[2, 6, 10, 9, 8], [7, 11, 15, 14, 13], [6, 10, 14, 13, 12]     // Diagonals
    ];
    for (const [a, b, c, d, e] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e] ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleNewGame = () => {
    setBoard(Array(16).fill(null));
    setIsONext(true);
    setWinner(null);
  };

  const renderCell = (index) => {
    return (
      <button className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="tic-tac-toe">
      <div className="scoreboard">
        <div>Player O: {scores.O}</div>
        <div>Player X: {scores.X}</div>
      </div>
      <div className="board">
        {[0, 1, 2, 3].map(row => (
          <div key={row} className="row">
            {[0, 1, 2, 3].map(col => renderCell(row * 4 + col))}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? `Winner: Player ${winner}` : `Next Player: ${isONext ? 'O' : 'X'}`}
      </div>
      <button className="new-game-button" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;

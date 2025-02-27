import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  function getMoveLocation(prevSquares, newSquares) {
    for (let i = 0; i < 9; i++) {
      if (prevSquares[i] !== newSquares[i]) {
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        return `(${row}, ${col})`;
      }
    }
    return "";
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const location = getMoveLocation(history[move - 1], squares);
      description = `Go to move #${move} ${location}`;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="sort-button" onClick={toggleSortOrder}>
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ul className="move-list">{sortedMoves}</ul>
      </div>
    </div>
  );  
}

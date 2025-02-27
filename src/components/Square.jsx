function Square({ value, onSquareClick, isWinningSquare }) {
    return (
      <button
        className={`square ${isWinningSquare ? "highlight" : ""}`}
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
  }
  
  export default Square;
  
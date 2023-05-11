import React from "react";
import { useState } from "react";

function Square({ buttonId, value, onSquareClick }) {
    return <button id={buttonId} className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {

    const winner = calculateWinner(squares);
    const [playCount, setPlayCount] = useState(0);
    let status;

    console.log(playCount);
    console.log(squares.length);

    if (winner) {
        status = "Winner: " + winner;
    }
    else if (playCount === squares.length) {
        status = "Match draw";
    }
    else
        status = "Next player: " + (xIsNext ? "X" : "O");

    function handleSquareClick(i) {

        if (squares[i] || calculateWinner(squares))
            return

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = 'X';
        }
        else {
            nextSquares[i] = 'O';
        }
        setPlayCount(playCount + 1)

        onPlay(nextSquares)
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square buttonId="0" value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
                <Square buttonId="1" value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
                <Square buttonId="2" value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
            </div>
            <div className="board-row">
                <Square buttonId="3" value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
                <Square buttonId="4" value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
                <Square buttonId="5" value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
            </div>
            <div className="board-row">
                <Square buttonId="6" value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
                <Square buttonId="7" value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
                <Square buttonId="8" value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
            </div>
        </>
    );
}

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        }
        else {
            description = 'Go to game start';
        }

        return (
            move === currentMove ? <li key={move}>
                <label>You are at move # {move + 1}</label>
            </li> :
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
        );
    });


    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            document.getElementById(a).style.background = "#FFAAFF";
            document.getElementById(b).style.background = "#FFAAFF";
            document.getElementById(c).style.background = "#FFAAFF";
            return squares[a];
        }
    }
    return null;

}
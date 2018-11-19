import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                "Go to move #" + move :
                "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board currentSquares={current.squares} onClick={(i) => this.handleClick(i)}></Board>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        if (this.calculateWinner(current.squares) || (current.squares[i])) {
            return;
        }
        // create the copy of the array
        const copiedSquares = current.squares.slice();
        copiedSquares[i] = this.state.xIsNext ? 'X' : 'O';
        // trigger setState with the copied array
        this.setState
            ({
                history: history.concat([{
                    squares: copiedSquares
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2], // first row
            [3, 4, 5], // second row
            [6, 7, 8], // third row
            [0, 3, 6], // first column
            [1, 4, 7], // second column
            [2, 5, 8], // third column
            [0, 4, 8], // first diagonal
            [2, 4, 6]  // second diagonal
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
                return squares[a];
            }
        }
        return null;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
}

export default Game;
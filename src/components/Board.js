import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.drawSquare(0)}
                    {this.drawSquare(1)}
                    {this.drawSquare(2)}
                </div>
                <div className="board-row">
                    {this.drawSquare(3)}
                    {this.drawSquare(4)}
                    {this.drawSquare(5)}
                </div>
                <div className="board-row">
                    {this.drawSquare(6)}
                    {this.drawSquare(7)}
                    {this.drawSquare(8)}
                </div>
            </div>
        );
    }

    drawSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    handleClick(i) {
        if (this.calculateWinner(this.state.squares) || (this.state.squares[i])) {
            return;
        }
        // create the copy of the array
        const copiedSquares = this.state.squares.slice();
        copiedSquares[i] = this.state.xIsNext ? 'X' : 'O';
        // trigger setState with the copied array
        this.setState
            ({
                squares: copiedSquares,
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
}

export default Board;
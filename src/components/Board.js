import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    render() {
        const status = "Next player: X";

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
        // create the copy of the array
        const copiedSquares = this.state.squares.slice();
        copiedSquares[i] = 'X';
        // trigger setState with the copied array
        this.setState({ squares: copiedSquares });
    }
}

export default Board;
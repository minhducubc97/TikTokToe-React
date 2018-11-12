import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
    drawSquare(i) {
        return <Square value={i} />;
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
}

export default Board;
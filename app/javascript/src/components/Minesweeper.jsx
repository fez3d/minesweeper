import React from "react";
import Board from "./Board";
import "./style/minesweeper.css";

class Minesweeper extends React.Component {
  render() {
    return (
      <div className="app">
        <Board />
      </div>
    );
  }
}
export default Minesweeper;

import React from "react";
import Cell from "./Cell";
import GameMenu from "./GameMenu";
import { connect } from "react-redux";
import { coordinateForBoard } from "../actions/actions";

class Board extends React.Component {
  render() {
    return (
      <div>
        <div className="mine-sweeper">
          <GameMenu />
          <table className="table-game">
            <tbody>
              {this.props.table.map((cells, row) => (
                <tr key={`mine-row-${row}`}>
                  {cells.map(cell => (
                    <Cell key={`mine-cell-${cell.position}`} {...cell} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ board }) => {
  const boardDim = Math.sqrt(Object.keys(board).length);
  const table = [];
  coordinateForBoard(boardDim, (coordinate, row, col) => {

    if (!table[row]) {
      table[row] = [];
    }
    table[row][col] = board[coordinate];
  });
  
  return { table };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

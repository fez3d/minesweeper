import React from "react";
import CoverCell from "./Cells/CoverCell"
import FlagCell from "./Cells/FalgCell"
import OpenCell from "./Cells/OpenCell"
import { connect } from "react-redux";
import { OPEN_CELL, SWITCH_CELL_FLAG } from "../actions/boardActions";

class Cell extends React.Component {
  render() {
    return (
      <td className="cell" onClick={() => this.props.onOpen(this.props.position)} onContextMenu={event => {
          event.preventDefault();
          this.props.onFlagToggle(this.props.position);
        }}>
    
        {!this.props.isOpen && !this.props.hasFlag && <CoverCell />}
        {!this.props.isOpen && this.props.hasFlag && <FlagCell />}
        {this.props.isOpen && <OpenCell hasMine={this.props.hasMine} count={this.props.count} />}
      </td>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = (dispatch) => ({
  onOpen: (position) => {
    dispatch({ type: OPEN_CELL, position });
  },

  onFlagToggle: (position) => {
    dispatch({ type: SWITCH_CELL_FLAG, position });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
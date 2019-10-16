import React from "react";
import { connect } from "react-redux";
import { RESET_BOARD } from "../actions/boardActions";

class GameMenu extends React.Component {
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.props.resetGame()}>
          Reiniciar
        </button>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  resetGame: () => {
    dispatch({ type: RESET_BOARD });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);

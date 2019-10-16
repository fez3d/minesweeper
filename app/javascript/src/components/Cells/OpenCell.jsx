import React from "react";

class OpenCell extends React.Component {
  render() {
    return (
      <div className="cell-cover cell-cover-opened">
        { !this.props.hasMine && this.props.count == 0 && <span></span> }
        { !this.props.hasMine && this.props.count > 0 && <span className={`cell-number`}>{this.props.count}</span>}
        { this.props.hasMine && <span className="cell-bomb">b</span> }
      </div>
    );
  }
}

export default OpenCell;
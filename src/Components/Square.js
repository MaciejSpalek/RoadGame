import React from "react";

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    console.log(this.props.firstSquare);
  }
  getDirection() {
    return Math.round(Math.random() * 3);
  }

  render() {
    const { firstSquare, row, col } = this.props;

    return (<div className={firstSquare === `${row}${col}` ? "startSquare" : "square"} onClick={this.handleSelect} col={col} row={row}></div>);
  }
}

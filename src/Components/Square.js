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
    const { firstSquare, row, col, partOfRoad } = this.props;
    parseInt(partOfRoad)
    return (<div
      className={`
        square
        ${firstSquare === `${row}${col}` ? "startSquare" : ""}
        ${partOfRoad[0] === `${row}${col}` ? "drawRoad" : ""}
      `}
      onClick={this.handleSelect}
      col={col}
      row={row} >
    </div>);
  }
}

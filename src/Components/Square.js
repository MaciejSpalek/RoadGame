import React from "react";
import classNames from "classnames";
// import setDuration from "./lib/setDuration";
export class Square extends React.Component {
  constructor(props) {
    super(props);



  }

  renderSquares() {
    const {
      firstSquare,
      row,
      col,
      partOfRoad,
      handleClick,
      clickedRoad,
      missArray
    } = this.props;
    console.log(partOfRoad ? true : false)

    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': partOfRoad.includes(`${row}${col}`) ? true : false,
      'hitSquare': true ? clickedRoad.filter(el => el === `${row}${col}`)[0] : false,
      'missSquare': true ? missArray.filter(el => el === `${row}${col}`)[0] : false
    })
    return (
      <div className={squareClass} onClick={(e) => handleClick(row, col, e)}></div >
    );
  }
  render() {
    return (
      this.renderSquares()
    )
  }
}

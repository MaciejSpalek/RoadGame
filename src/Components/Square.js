import React from "react";
import classNames from "classnames";

const Square = ({ firstSquare, row, col, partOfRoad, handleClick, clickedRoad, missArray, }) => {
  const squareClass = classNames({
    'square': true,
    'startSquare': firstSquare === `${row}${col}`,
    'drawRoad': true ? partOfRoad.includes(`${row}${col}`) : false,
    'hitSquare': true ? clickedRoad.filter(el => el === `${row}${col}`)[0] : false,
    'missSquare': true ? missArray.filter(el => el === `${row}${col}`)[0] : false
  })
  return (
    <div className={squareClass} onClick={(e) => handleClick(row, col, e)}></div >
  );
}

export default Square;
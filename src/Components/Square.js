import React from "react";
import classNames from "classnames";
export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: "",
      squareNumber: null,
      lastClickedIndex: 0,
      isVisible: false,
      road: props.road,
      isRunning: props.isStarted,
      isDisabled: true,
    }
    this.timeForDrawId = null;
    this.timeForHideId = null;
  }


 
  

  // setTime(myTime) {
  //   const { amountOfSquares, time } = this.props;
  //   return (amountOfSquares * time) + myTime;
  // }

  // hideRoad() {
  //   return new Promise((resolve, reject) => {
  //     this.timeForHideId = setTimeout(() => {
  //       this.setState({
  //         draw: "",
  //         isVisible: false,
  //         isRunning: false,
  //       })
  //     }, this.setTime(5000))

  //     if (!this.state.isRunning) {
  //       window.clearTimeout(this.timeForHideId)
  //       this.timeForHideId = null;
  //     }
  //   })
  // }
  renderSquares = () => {
    // this.updateRoad()
    // const { 
    //   draw, 
    //   isVisible 
    // } = this.state;

    const { 
      firstSquare, 
      row, 
      col, 
      partOfRoad, 
      duration, 
      index, 
      handleClick, 
      clickedRoad, 
      missArray,
      isVisible, 
      draw
    } = this.props;

    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': isVisible ? partOfRoad[0] === `${row}${col}` ? draw : null : false,
      'hitSquare': true ? clickedRoad.filter(el => el === `${row}${col}`)[0] : false,
      'missSquare': true ? missArray.filter(el => el === `${row}${col}`)[0] : false
    })

    return (
      <div
        index={index}
        className={squareClass}
        col={col}
        row={row}
        duration={duration}
        clickedroad={clickedRoad}
        missarray={missArray}
        isvisible={isVisible}
        draw={draw}

        onClick={(e) => handleClick(row, col, e)}
      >
      </div >
    );
  }
  render() {
    return (
      this.renderSquares()
    )
  }
}

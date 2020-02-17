import React from "react";
import classNames from "classnames";
export class Square extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   draw: "",
    //   squareNumber: null,
    //   lastClickedIndex: 0,
    //   isVisible: false,
    //   road: props.road,
    //   isRunning: props.isStarted,
    //   isDisabled: true,
    // }
    
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
    const { 
      firstSquare, 
      row, 
      col, 
      partOfRoad, 
      handleClick, 
      clickedRoad, 
      missArray,
      isVisible, 
      draw
    } = this.props;
    console.log(row, col, partOfRoad, isVisible, draw)
    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': isVisible ? partOfRoad === `${row}${col}` ? draw : null : false,
      // 'drawRoad': true ? partOfRoad === `${row}${col}` ? draw : null : false,
      // 'drawRoad': true ? partOfRoad === `${row}${col}` : false,

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

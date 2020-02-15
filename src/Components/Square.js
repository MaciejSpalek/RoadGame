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

  async componentDidUpdate() {
    const { row, col, partOfRoad } = this.props;

    if (this.state.isRunning) {
      await this.hideRoad()
    }
  }

  setDrawRoad(newState, duration) {
    if (this.state.isRunning) {
      return new Promise((resolve) => {
        this.timeForDrawId = setTimeout(() => {
          this.setState(newState, () => {
            resolve()
          })
        }, duration)
      })
    }
  }
  async wait(duration) {
    await this.setDrawRoad({
      draw: "drawRoad", isVisible: true
    }, duration)
    if (this.timeForDrawId > 30) {
      window.clearTimeout(this.timeForDrawId)
      this.timeForDrawId = null
    }
  }
  updateRoad() {
    const { row, col, partOfRoad, duration } = this.props;
    if (partOfRoad[0] === `${row}${col}`) {
      this.wait(duration.filter(el => typeof el == "number" ? el : null)[0]);
    }
  }
  hideRoad() {
    return new Promise((resolve, reject) => {
      this.timeForHideId = setTimeout(() => {
        this.setState({
          draw: "",
          isVisible: false,
          isRunning: false
        })
      }, 5000)
      if (!this.state.isRunning) {
        window.clearTimeout(this.timeForHideId)
        this.timeForHideId = null;
      }
    })
  }
  renderSquares = () => {
    this.updateRoad()
    const { draw, isVisible, isDisabled, } = this.state;
    const { firstSquare, row, col, partOfRoad, duration, index, handleClick, disabled, isHitSquare } = this.props;
    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': isVisible ? partOfRoad[0] === `${row}${col}` ? draw : null : false,
      'hitSquare': partOfRoad[0] === `${row}${col}` ? isHitSquare : false
    })
    // console.log(row, col)
    return (
      <div
        index={index}
        className={squareClass}
        col={col}
        row={row}
        duration={duration}
        disabled={disabled}
        onClick={() => handleClick(row, col, index)}
      >
        {index}
      </div >
    );
  }
  render() {
    return (
      this.renderSquares()
    )
  }
}

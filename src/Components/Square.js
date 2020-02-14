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
    }
    this.checkRoad= this.checkRoad.bind(this);
    this.timeForDrawId = null;
    this.timeForHideId = null;
  }

  checkRoad(event) {
    event.preventDefault();
    const { partOfRoad, row, col, index } = this.props;
    let { lastClickedIndex } = this.state;
    const currentIndex = index.filter(el => typeof el == "number" ? el+1 : null)[0];

    console.log("Początek funkcji"+ lastClickedIndex)
    if(currentIndex == lastClickedIndex) {
        this.setState({
          lastClickedIndex: lastClickedIndex+5
        })
      } 
      console.log("Koniec funkcji"+ lastClickedIndex)
  }
  componentDidUpdate() {
    this.updateRoad()
  }
  
 
  async componentDidUpdate() {
    if (this.state.isRunning) {
      this.hideRoad()
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
       draw: "drawRoad", isVisible: true }, duration)
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
    const { draw, isVisible } = this.state;
    const { firstSquare, row, col, partOfRoad, duration, index } = this.props;
    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': isVisible ? partOfRoad[0] === `${row}${col}` ? draw : null : false
    })

    return (
      <div
        index={index}
        className={squareClass}
        col={col}
        row={row}
        duration={duration}
        onClick={this.checkRoad}
      >
        {}
      </div >
    );
  }
  render() {
    return (
      this.renderSquares()
    )
  }
}

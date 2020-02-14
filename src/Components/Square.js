import React from "react";
import ReactDOM from "react-dom"
import classNames from "classnames";

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: "",
      isRunning: false
    }
    this.tick = null
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    console.log(this.props.firstSquare);
    console.log(this.props.partOfRoad);
  }
  componentDidUpdate(prevProps, prevState) {
  }
  setDrawRoad() {
    this.setState({
      draw: "drawRoad",
      isRunning: true
    })
  }
  wait(duration) {
    if (this.props.isStarted) {
      this.tick = setTimeout(() => {
        this.setDrawRoad()
      }, duration);
    }
    if (this.tick > 30) {
      window.clearTimeout(this.tick)
    }
  }
  componentDidMount() {
  }
  updateRoad() {
    const { row, col, partOfRoad, duration } = this.props;
    if (partOfRoad[0] === `${row}${col}`) {
      this.wait(duration.filter(el => typeof el == "number" ? el : null)[0]);
    }
  }
  renderSquares = () => {
    this.updateRoad()
    const { firstSquare, row, col, partOfRoad, duration } = this.props;
    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': partOfRoad[0] === `${row}${col}` ? this.state.draw : null
    })
    return (
      <div
        className={squareClass}
        col={col}
        row={row}
        duration={duration}
        onClick={this.handleSelect}
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

import React from "react";
import classNames from "classnames"
export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: "",
    }
    this.timer = null;

    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    // console.log(this.props.firstSquare);
    // console.log(this.props.partOfRoad);
  }
  componentDidUpdate() {
    this.updateRoad()

  }
  async wait(duration) {


    this.timer = setTimeout(() => {
      this.setState({
        draw: "drawRoad"
      })
      // console.log(duration);

    }, duration);
    // this.clearWait()
    if (this.timer) {
      console.log(this.timer);
      if (this.timer > 40) {
        clearTimeout(this.timer)
      }
    }
  }

  clearWait() {

  }
  updateRoad() {
    const { row, col, partOfRoad, duration } = this.props;
    if (partOfRoad[0] === `${row}${col}`) {
      duration.filter(dur => partOfRoad && dur ? this.wait(dur) : null)
    }
  }
  renderSquares = () => {
    const { firstSquare, row, col, partOfRoad } = this.props;
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

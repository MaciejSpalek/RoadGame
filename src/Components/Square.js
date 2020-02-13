import React from "react";
import classNames from "classnames";

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: "",
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    console.log(this.props.firstSquare);
    console.log(this.props.partOfRoad);
  }
  componentDidUpdate() {
    this.updateRoad()
  }

  wait(duration) {
    setTimeout(() => {
       this.setState({
        draw: "drawRoad"
      })
    }, duration);
  }


  updateRoad() {
    const { row, col, partOfRoad, duration } = this.props;
      if(partOfRoad[0] === `${row}${col}` ) {
        this.wait(duration.filter(el => typeof el == "number" ? el : null)[0]);
      } 
  }

  renderSquares = () => {
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
        duration = {duration}
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

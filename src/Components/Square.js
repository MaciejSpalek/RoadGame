import React from "react";
import classNames from "classnames";

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: "",
      squareNumber: null,
      lastClickedIndex: 0
    }
    this.checkRoad= this.checkRoad.bind(this);
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
  
  wait(duration, index) {
    setTimeout(() => {
      this.setState({
        draw: "drawRoad",
        squareNumber: (index.map(el => typeof el == "number" ? el+1 : null))
      })
    }, duration);
  }
  
  
  updateRoad() {
    const { row, col, partOfRoad, duration, index } = this.props;
      if(partOfRoad[0] === `${row}${col}` ) {
        this.wait(duration.filter(el => typeof el == "number" ? el : null)[0], index);
      } 
  }

  renderSquares = () => {
    const { firstSquare, row, col, partOfRoad, duration, index } = this.props;
    const { squareNumber, lastClickedIndex } = this.state;
    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': partOfRoad[0] === `${row}${col}` ? this.state.draw : null
    })

    return (
      <div
        className = {squareClass}
        col = {col}
        row = {row}
        index = {index}
        duration = {duration}
        onClick = {this.checkRoad}
      >
        {squareNumber}
      </div >
    );
  }
  render() {
    return (
      this.renderSquares()
    )
  }
}

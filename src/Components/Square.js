import React from "react";

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    console.log(this.props.firstSquare);
    console.log(this.props.partOfRoad);
  }

  // updateRoad(duration) {
  //   setTimeout(() => {
  //     console.log(duration);
  //   }, duration);
  //   return "drawRoad";
  // }

  async updateRoad(duration) {
    await this.timeout(duration)
    // console.log(duration)
    return "drawRoad";
  }


  async timeout(ms) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  // delay = (t) => new Promise(resolve => setTimeout(resolve, t));
  
  
  // delay(3000).then(() => console.log('Hello'));


  
  // async updateRoad(duration) {
  //  await this.delay(duration).then(() => "drawRoad")
  // }


  renderSquares() {
    const { firstSquare, row, col, partOfRoad, duration } = this.props;
    // let variable = null;
    // console.log(partOfRoad[0])
    return (
      <div
        className = {`
          square
          ${firstSquare === `${row}${col}` ? "startSquare" : ""}
          ${partOfRoad[0] === `${row}${col}`? 
           this.updateRoad(duration.map(el => typeof el == "number" ? el : null)[0]).then(resolve => {
             return resolve
           })
          : ""} 
        `
        }
        col={col}
        row={row}
        duration={duration}
        onClick={this.handleSelect}
      >
        {}
      </div>
    );
  }

  render() {
    return this.renderSquares();
  }
}

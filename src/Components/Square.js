import React from "react";

export class Square extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    // console.log(this.props.firstSquare);
    // console.log(this.props.partOfRoad);
  }

  // updateRoad(duration) {
  //   setTimeout(() => {
  //     console.log(duration);
  //   }, duration);
  //   return "drawRoad";
  // }

  // async updateRoad(duration) {
  //   await this.timeout(duration)
  //   console.log(duration)
  //   const draw = "drawRoad"
  //   return draw
  //   // await duration.map(el => typeof el == "number" ? "string" : null)
  // }




  // delay = (t) => new Promise(resolve => setTimeout(resolve, t));


  // delay(3000).then(() => console.log('Hello'));



  // async updateRoad(duration) {
  //  await this.delay(duration).then(() => "drawRoad")
  // }




  renderSquares() {
    const { firstSquare, row, col, partOfRoad, duration, road } = this.props;
    const squareClass = classNames({
      'square': true,
      'startSquare': firstSquare === `${row}${col}`,
      'drawRoad': partOfRoad[0] === `${row}${col}`

    })


    return (
      <div
        className={squareClass
        }
        col={col}
        row={row}
        onClick={this.handleSelect}
      >
        {}
      </div >
    );
  }

  render() {
    return this.renderSquares();
  }
}

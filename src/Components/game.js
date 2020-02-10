import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.buttonListener = this.buttonListener.bind(this);
    this.state = {
      board: [],
      secondBoard: [],
      road: [],
      dimension: 10,
      firstSquare: null
    };
    
  }

  componentDidMount() {
    this.setState({
      board: this.myList()
    });
  }
  
  myList() {
    let list = [];
    for (let row = 0; row < this.state.dimension; row++) {
      list[row] = [];
      for (let col = 0; col < this.state.dimension; col++) {
        list[row][col] = `${row}-${col}`;
      }
    }
    return list;
  }

  getRandom() {
    return this.state.board[
      Math.round(Math.random() * this.state.board.length)
    ];
  }

  drawFirstSquare() {
    let randomFiled = this.getRandom();
    this.setState({firstSquare: randomFiled}, console.log(randomFiled));
    
  }

  // boardLoop() {
  //   this.state.board.map(square => {
  //     if()
  //   })
  // }

  getDirection() {
    return Math.round(Math.random() *3);
  }
  createRoad() {
    const direction = this.getDirection();
    
    if(direction == 0) {
      console.log("up")
      
    } 

    else if(direction == 1) {
      console.log("right")

    }

    else if(direction == 2) {
      console.log("down")

    } 

    else {
      console.log("left")

    }
  }


  buttonListener() {
    this.drawFirstSquare();
  }










  // return grid.map((row, i) => {
  //   return row.map((square, j) => {
  //     return (
  //       <ShipGridSquare
  //         key={`${i}${j}`}
  //         i={i}
  //         j={j}
  //         shipsSet={shipsSet}
  //         square={square}
 
  renderSquares() {
    const { firstSquare, board } = this.state;
    return board.map((row, i) => {
      return row.map((square, j) => {
        return (
          <Square 
            firstSquare={firstSquare === square ? firstSquare : null}
            key={`${i}${j}`}
            row={i} 
            col={j} 
          >
          </Square>
        );
      })
  })
  }
  render() {
    return (
      <>
        <div className="game">
          <div className="board">
            {
              this.renderSquares()
            }
          </div>
          <button className="game__start-button" onClick={this.buttonListener}> Start </button>
        </div>
      </>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect() {
    console.log(this.props.firstSquare);
  }
  getRandom() {
    return Math.round(Math.random() * 3);
  }
  getRow() {
    return this.props.value.substr(0, 1);
  }
  getColumn() {
    return this.props.value.substr(2, 1);
  }
  render() {
    const { firstSquare, row, col } = this.props;
    console.log(row, col)
    return (
      <div
        className={firstSquare === col ? "startSquare" : "square"}
        onClick={this.handleSelect}
        col = {col}
        row = {row}
      ></div>
    );
  }
}

export default Board;

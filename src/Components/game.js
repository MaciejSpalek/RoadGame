import React from "react";
import { Square } from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.buttonListener = this.buttonListener.bind(this);
    this.state = {
      board: [],
      road: [],
      dimension: 10,
      amountOfSquares: 5,
      firstSquare: null
    };
  }

  componentDidMount() {
    this.setState({
      board: this.createBoard()
    });
  }
  
  createBoard() {
    let list = [];
    for (let row = 0; row < this.state.dimension; row++) {
      list[row] = [];
      for (let col = 0; col < this.state.dimension; col++) {
        list[row][col] = `${row}${col}`;
      }
    }
    return list;
  }

  getRandom() {
    return this.state.board[Math.round(Math.random()*9)][Math.round(Math.random()*9)];
  }
  drawFirstSquare() {
    let randomFiled = this.getRandom();
    this.setState({firstSquare: randomFiled});
    this.getNewSquare(randomFiled);
    
    console.log(this.state.road);
  }

  getDirection() {
    return Math.round(Math.random() *3);
  }

  getNewSquare(lastSquare) {
    const { road, board } = this.state;

    for(let i=0; i<this.state.amountOfSquares; i++) {
      const direction = this.getDirection();
      const row = lastSquare.substr(0, 1);
      const col = lastSquare.substr(1, 1);
    
    // console.log(lastSquare, row, col)
    
      if(direction == 0) {
        console.log("up")
        if(row-1<=0) {
          road.push(board[row-1][col])
          return lastSquare = `${row-1}${col}`
        } else {
          this.getNewSquare(lastSquare)
        }
      } 

      else if(direction == 1) {
        console.log("right")
        if(col+1<=9) {
          road.push(board[row][col+1])
          return lastSquare = `${row}${col+1}`
        } else {
          this.getNewSquare(lastSquare)
        }
      }

      else if(direction == 2) {
        console.log("down")
        if(row+1<=9) {
          road.push(board[row+1][col])
          return lastSquare = `${row+1}${col}`
        } else {
          this.getNewSquare(lastSquare)
        }
      } 

      else {
        console.log("left")
        if(col-1>=0) {
          road.push(board[row][col-1])
          return lastSquare = `${row}${col-1}`
        } else {
          this.getNewSquare(lastSquare)
        }
      }
    }
  }


  buttonListener() {
    this.drawFirstSquare();
  }
  renderSquares() {
    const { firstSquare, board } = this.state;
    return board.map((row, i) => {
      return row.map((col, j) => {
        return (
          <Square 
            firstSquare={firstSquare === col ? firstSquare : null}
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

export default Board;

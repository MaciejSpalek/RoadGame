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
      amountOfSquares: 10,
      firstSquare: null,
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
    return this.state.board[Math.round(Math.random() * 9)][Math.round(Math.random() * 9)];
  }
  drawFirstSquare = async () => {
    let randomFiled = this.getRandom();
    await this.setState({ firstSquare: randomFiled })
    await this.setRoad(randomFiled)
    console.log(`first: ${this.state.firstSquare} road: ${this.state.road}`)
  }

  setRoad = async firstSquare => {
    const roadArray = [];
    for (let i = 0; i < this.state.amountOfSquares; i++) {
      this.setSingleSquare(roadArray, firstSquare, i)
    }
    await this.setState({ road: roadArray })
  }

  isBusySquare(roadArray, row, col) {
    for (let i = 0; i < roadArray.length; i++) {
      if (roadArray[i] === `${row}${col}` || this.state.firstSquare === `${row}${col}`) {
        return true;
      }
    }
  }

  setSingleSquare(roadArray, firstSquare, i) {
    const { board } = this.state;
    const direction = this.getDirection();
    let row;
    let col;

    if (i < 1) {
      row = +firstSquare.substr(0, 1);
      col = +firstSquare.substr(1, 1);
    } else {
      row = +roadArray[roadArray.length - 1].substr(0, 1);
      col = +roadArray[roadArray.length - 1].substr(1, 1);
    }
    if (direction === 0) {
      if (row - 1 >= 0 && !this.isBusySquare(roadArray, row - 1, col)) {
        firstSquare = board[row - 1][col]
        roadArray.push(firstSquare)
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    } else if (direction === 1) {
      if (col + 1 <= 9 && !this.isBusySquare(roadArray, row, col + 1)) {
        firstSquare = board[row][col + 1];
        roadArray.push(firstSquare)
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    } else if (direction === 2) {
      if (row + 1 <= 9 && !this.isBusySquare(roadArray, row + 1, col)) {
        firstSquare = board[row + 1][col]
        roadArray.push(firstSquare)
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    } else if (direction === 3) {
      if (col - 1 >= 0 && !this.isBusySquare(roadArray, row, col - 1)) {
        firstSquare = board[row][col - 1]
        roadArray.push(firstSquare)
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }
  }

  getDirection() {
    return Math.round(Math.random() * 3);
  }

  buttonListener() {
    this.drawFirstSquare();
  }

  renderSquares() {
    const { firstSquare, board, road } = this.state;
    return board.map((row, i) => {
      return row.map((col, j) => {
        return (
          <Square
            partOfRoad={road.filter(part => part === col ? part : null)}
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
      <div className="game">
        <div className="board">
          {
            this.renderSquares()
          }
        </div>
        <button className="game__start-button" onClick={this.buttonListener}> Start </button>
      </div>
    );
  }
}

export default Board;

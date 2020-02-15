import React from "react";
import ReactDOM from "react-dom"
import { Square } from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      road: [],
      dimension: 10,
      time: 500,
      amountOfSquares: 3,
      firstSquare: null,
      isStarted: false,
      lastClickedIndex: 0,
      miss: 0,
      isHitSquare: false
    }
    this.buttonListener = this.buttonListener.bind(this);
    this.checkRoad = this.checkRoad.bind(this)
  }
  componentDidMount() {
    this.setState({
      board: this.createBoard()
    });
    this.isStarted()
  }
  componentDidUpdate() {
    // const node = ReactDOM.findDOMNode(this);
    // let child;
    // if (node instanceof HTMLElement) {
    //   if (child = node.getElementsByClassName('drawRoad'))
    //     console.log(child)
    // }
    // console.log(this.state.lastClickedIndex)

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
    return this.state.board[Math.round(Math.random() * 9)][
      Math.round(Math.random() * 9)
    ];
  }
  drawFirstSquare = async () => {
    let randomFiled = this.getRandom();
    await this.setState({ firstSquare: randomFiled });
    await this.setRoad(this.state.firstSquare);
    // console.log(`first: ${this.state.firstSquare} road: ${this.state.road}`);
  }
  setRoad = firstSquare => {
    const roadArray = [];
    for (let i = 0; i < this.state.amountOfSquares; i++) {
      this.setSingleSquare(roadArray, firstSquare, i);
    }
    this.setState({ road: roadArray });
  }
  isBusySquare(roadArray, row, col) {
    for (let i = 0; i < roadArray.length; i++) {
      if (
        roadArray[i] === `${row}${col}` ||
        this.state.firstSquare === `${row}${col}`
      ) {
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

    // up
    if (direction === 0) {
      if (row - 1 >= 0 && !this.isBusySquare(roadArray, row - 1, col)) {
        firstSquare = board[row - 1][col];
        roadArray.push(firstSquare);
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i);
      }
    }

    // up - right
    // if (direction === 1) {
    //   if (
    //     row - 1 >= 0 &&
    //     col + 1 <= 9 &&
    //     !this.isBusySquare(roadArray, row - 1, col + 1)
    //   ) {
    //     firstSquare = board[row - 1][col + 1];
    //     roadArray.push(firstSquare);
    //   } else {
    //     return this.setSingleSquare(roadArray, firstSquare, i)
    //   }
    // }

    // right
    else if (direction === 1) {
      if (col + 1 <= 9 && !this.isBusySquare(roadArray, row, col + 1)) {
        firstSquare = board[row][col + 1];
        roadArray.push(firstSquare);
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }
    // right - down
    // else if (direction === 3) {
    //   if (
    //     row + 1 <= 9 &&
    //     col + 1 <= 9 &&
    //     !this.isBusySquare(roadArray, row + 1, col + 1)
    //   ) {
    //     firstSquare = board[row + 1][col + 1];
    //     roadArray.push(firstSquare);
    //   } else {
    //     return this.setSingleSquare(roadArray, firstSquare, i)
    //   }
    // }
    // down
    else if (direction === 2) {
      if (row + 1 <= 9 && !this.isBusySquare(roadArray, row + 1, col)) {
        firstSquare = board[row + 1][col];
        roadArray.push(firstSquare);
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }
    // left - down
    // else if (direction === 5) {
    //   if (
    //     row + 1 <= 9 &&
    //     col - 1 >= 0 &&
    //     !this.isBusySquare(roadArray, row + 1, col - 1)
    //   ) {
    //     firstSquare = board[row + 1][col - 1];
    //     roadArray.push(firstSquare);
    //   } else {
    //     return this.setSingleSquare(roadArray, firstSquare, i)
    //   }
    // }

    // left
    else if (direction === 3) {
      if (col - 1 >= 0 && !this.isBusySquare(roadArray, row, col - 1)) {
        firstSquare = board[row][col - 1];
        roadArray.push(firstSquare);
      } else {
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }

    // left - up
    // else if (direction === 7) {
    //   if (
    //     col - 1 >= 0 &&
    //     row - 1 >= 0 &&
    //     !this.isBusySquare(roadArray, row - 1, col - 1)
    //   ) {
    //     firstSquare = board[row - 1][col - 1];
    //     roadArray.push(firstSquare);
    //   } else {
    //     return this.setSingleSquare(roadArray, firstSquare, i)
    //   }
    // }
  }
  getDirection() {
    return Math.round(Math.random() * 3);
  }
  isStarted() {
    this.setState({
      isStarted: true
    })
  }
  buttonListener = async () => {
    await this.setState({
      road: [],
      firstSquare: null,
      isStarted: false
    })
    await this.drawFirstSquare();
    await this.isStarted()
  }
  checkRoad = async (row, col, index) => {
    const { lastClickedIndex, miss } = this.state;
    const currentIndex = index.filter(el => typeof el == "number" ? el + 1 : null)[0];
    // console.log(index.length);


    if (currentIndex === lastClickedIndex) {
      await this.setState((prevState) => ({
        lastClickedIndex: prevState.lastClickedIndex + 1,
        isHitSquare: true
      }))
      console.log("LastCliked =", this.state.lastClickedIndex)
    } else {
      await this.setState((prevState) => ({
        miss: prevState.miss + 1
      }))
      console.log("Miss is numer", this.state.miss)
    }
    if (lastClickedIndex === index.length - 1) {
      console.log("You got it everything")
    }
    if (miss >= 2) {
      console.log("You failed")
    }
  }
  renderBoardAndRoad() {
    const { firstSquare, board, road, time, isStarted, isHitSquare } = this.state
    return board.map((row, i) => {
      return row.map((col, j) => {
        return (
          <Square
            isStarted={isStarted}
            road={road}
            partOfRoad={road.filter(part => (part === col ? part : null))}
            duration={road.map((square, index) => (square === col ? (index + 1) * time : null))}
            firstSquare={firstSquare === col ? firstSquare : null}
            key={`${i}${j}`}
            row={i}
            col={j}
            index={road.map((square, index) => (square === col ? index : null))}
            isHitSquare={road.map((square, index) => (square === col ? isHitSquare : null))}
            handleClick={this.checkRoad}
            disabled={!true}
          ></Square>
        );
      });
    });
  }
  render() {
    return (
      <div className="game">
        <div className="board">{this.renderBoardAndRoad()}</div>
        <button disabled={false} className="game__start-button" onClick={this.buttonListener}>
          START
        </button>
      </div>
    );
  }
}

export default Board;

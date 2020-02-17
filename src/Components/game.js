import React from "react";
// import ReactDOM from "react-dom"
import { Square } from "./Square";
import Counter from './Counter/Counter'
import setDuration from "./lib/setDuration"

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
      isGameStarted: false,
      isWin: false,
      lastClickedIndex: 0,
      miss: 0,
      currentCol: 0,
      currentRow: 0,
      clickedRoad: [],
      missArray: [],
      areSquaresLocked: true,
      counterIsVisible: false,
      isButtonDisabled: false,
    }
    this.buttonListener = this.buttonListener.bind(this);
    this.checkRoad = this.checkRoad.bind(this)
  }
  componentDidMount() {
    this.setState({
      board: this.createBoard()
    });
    this.isGameStarted()
  }
  componentDidUpdate() {
    // const node = ReactDOM.findDOMNode(this);
    // let child;
    // if (node instanceof HTMLElement) {
    //   if (child = node.getElementsByClassName('drawRoad'))
    //     console.log(child)
    // }
    // console.log(this.state.lastClickedIndex)
    // console.log(this.state.clickedRoad)

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
  isGameStarted() {
    this.setState({
      isGameStarted: true
    })
  }
  unlockSquares() {
    const { amountOfSquares, time } = this.state;
    setTimeout(() => {
      this.setState({
        areSquaresLocked: false
      })
    }, setDuration({ amountOfSquares, time }, 5000))
  }
  buttonListener = async () => {
    await this.setState({
      road: [],
      firstSquare: null,
      isGameStarted: false,
    })
    await this.drawFirstSquare();
    await this.isGameStarted();
    await this.unlockSquares();
    await this.setCounter();
  }

  checkRoad = (row, col, index, e) => {
    e.preventDefault()
    const { lastClickedIndex, miss, clickedRoad, missArray, board, road, areSquaresLocked, firstSquare } = this.state;
    // const currentIndex = index.filter(el => typeof el == "number" ? el + 1 : null)[0];
    if (areSquaresLocked || clickedRoad.includes(board[row][col]) || board[row][col] === firstSquare) return;

    if (road.includes(board[row][col])) {
      this.setState(prevState => ({
        lastClickedIndex: prevState.lastClickedIndex + 1,
        clickedRoad: [...prevState.clickedRoad, board[row][col]]
      }), () => {
        if (this.state.lastClickedIndex === road.length) {
          console.log("You got it everything")
          this.ifWin()
        }
      })
    } else {
      this.setState(prevState => ({
        miss: prevState.miss + 1,
        missArray: [...missArray, board[row][col]]
      }), () => {
        if (this.state.miss > 2) {
          console.log("You failed")
        }
      })
    }
  }
  async setCounter() {
    const { amountOfSquares, time } = this.state
    setTimeout(() => {
      console.log('counter is started')
      this.setState({
        counterIsVisible: true
      })
    }, await setDuration({ amountOfSquares, time }, -200))
  }
  ifWin() {
    setTimeout(() => {
      this.setState({
        isGameStarted: false,
        isButtonDisabled: false,
        areSquaresLocked: true,
        road: [],
        clickedRoad: [],
        missArray: [],
        firstSquare: null,
        lastClickedIndex: 0,
        miss: 0,
        isWin: true,
        counterIsVisible: false
      })
    }, 1000);
  }


  renderBoardAndRoad() {
    const { firstSquare, board, road, time, isGameStarted, clickedRoad, missArray, areSquaresLocked, amountOfSquares, isWin } = this.state
    return board.map((row, i) => {
      return row.map((col, j) => {
        return (
          <Square
            isGameStarted={isGameStarted}
            isLocked={areSquaresLocked}
            road={road}
            partOfRoad={road.filter(part => (part === col ? part : null))}
            duration={road.map((square, index) => (square === col ? (index + 1) * time : null))}
            firstSquare={firstSquare === col ? firstSquare : null}
            key={`${i}${j}`}
            row={i}
            col={j}
            index={road.map((square, index) => (square === col ? index : null))}
            clickedRoad={clickedRoad}
            missArray={missArray}
            time={time}
            amountOfSquares={amountOfSquares}
            handleClick={this.checkRoad}
            isWin={isWin}
          ></Square>
        );
      });
    });
  }
  render() {
    const { isButtonDisabled, counterIsVisible } = this.state;
    return (
      <div className="game">
        <div className="board">{this.renderBoardAndRoad()}</div>
        <button disabled={isButtonDisabled} className="game__start-button" onClick={this.buttonListener}>
          START
        </button>
        {counterIsVisible ? <Counter /> : null}
      </div>
    );
  }
}

export default Board;

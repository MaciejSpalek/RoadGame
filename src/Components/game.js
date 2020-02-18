import React from "react";
import Square from "./Square";
// import Counter from './Counter/Counter'
import { setDuration } from "./lib/helpers"
import Counter from "./Counter/Counter";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrays
      board: [],
      road: [],
      clickedRoad: [],
      missArray: [],
      partOfRoad: [],
      busyArray: [],

      // variables
      dimension: 10,
      time: 1,
      amountOfSquares: 20,
      firstSquare: null,
      lastClickedIndex: 0,
      miss: 0,
      level: 1,
      buttonCaption: "START",


      // flags
      isButtonDisabled: false,
      isWin: false,
      areSquaresLocked: true,
      counterIsVisible: false
    }
    this.buttonListener = this.buttonListener.bind(this);
    this.checkRoad = this.checkRoad.bind(this)
    this.timeForDrawId = null;
    this.timeForHideId = null;
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
    for (let i = 0; i < this.state.amountOfSquares-1; i++) {
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
  setBusyState(direction) {
    if(!this.state.busyArray.includes(direction)) {
      this.setState({
        busyArray: [...this.state.busyArray, direction]
      })
    }
  }
  setSingleSquare(roadArray, firstSquare, i) {
    if (this.state.busyArray.length > 3) {
      this.setState({
        road: [],
        busyArray: []
      })
      return this.drawFirstSquare();
    }

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
      // console.log("up");
      if (row - 1 >= 0 && !this.isBusySquare(roadArray, row - 1, col)) {
        firstSquare = board[row - 1][col];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        console.log(`Direction ===> ${direction}, Square[${row-1}][${col}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
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
      // console.log("right");

      if (col + 1 <= 9 && !this.isBusySquare(roadArray, row, col + 1)) {
        firstSquare = board[row][col + 1];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        console.log(`Direction ===> ${direction}, Square[${row}][${col+1}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
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
      // console.log("down");

      if (row + 1 <= 9 && !this.isBusySquare(roadArray, row + 1, col)) {
        firstSquare = board[row + 1][col];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        console.log(`Direction ===> ${direction}, Square[${row+1}][${col}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
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
      // console.log("left");

      if (col - 1 >= 0 && !this.isBusySquare(roadArray, row, col - 1)) {
        firstSquare = board[row][col - 1];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        console.log(`Direction ===> ${direction}, Square[${row}][${col-1}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
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
    // return this.setSingleSquare(roadArray, firstSquare, i);
  }
  getDirection() {
    return Math.round(Math.random() * 3);
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
      isButtonDisabled: true,
      isWin: false
    })
    await this.drawFirstSquare();
    // await this.setCounter();
    await this.unlockSquares();
    await this.updateRoad();
    await this.hideRoad();
  }

  setSquareDuration(road, col) {
    const durationArray = road.map((square, index) => (square === col ? (index + 1) * this.state.time : null));
    const durationElement = durationArray.filter(square => typeof square === "number")[0];
    return durationElement;
  }

  updateRoad() {
    const { road, board } = this.state;
    const tempArray = [];
    board.map((row) => {
      row.map((col) => {
        if (col === road.filter(roadSquare => roadSquare === col ? col : null)[0]) {
          const duration = this.setSquareDuration(road, col);
          this.wait(tempArray, col, duration);
        }
      })
    })
  }

  wait = (tempArray, col, duration) => {
    setTimeout(() => {
      tempArray.push(col)
      this.setState({
        partOfRoad: tempArray
      })
    }, duration);
  }
  hideRoad() {
    const { amountOfSquares, time } = this.state;
    setTimeout(() => {
      this.setState({
        partOfRoad: [],
        counterIsVisible: false
      })
    }, setDuration({ amountOfSquares, time }, 5500))
  }

  ifWin() {
    this.setState({
      areSquaresLocked: true
    })
    setTimeout(() => {
      this.setState(prevState => ({
        isButtonDisabled: false, // turn on button
        isButtonClicked: false,
        isStarted: false,
        // areSquaresLocked: true, // disable click on squares
        isWin: true,

        missArray: [],
        road: [],
        clickedRoad: [],
        firstSquare: null,
        level: prevState.level + 1,
        amountOfSquares: prevState.amountOfSquares + 2,
        lastClickedIndex: 0,
        buttonCaption: "NEXT LEVEL",
        partOfRoad: []
      }))
    }, 1000);
  }
  checkRoad = (row, col, e) => {
    e.preventDefault()
    const { clickedRoad, missArray, board, road, areSquaresLocked, firstSquare } = this.state;
    if (areSquaresLocked ||
      clickedRoad.includes(board[row][col]) ||
      missArray.includes(board[row][col]) ||
      board[row][col] === firstSquare)
      return;

    if (road.includes(board[row][col])) {
      this.setState(prevState => ({
        lastClickedIndex: prevState.lastClickedIndex + 1,
        clickedRoad: [...prevState.clickedRoad, board[row][col]]
      }), () => {
        if (this.state.lastClickedIndex === road.length) {
          console.log("You got it everything")
          this.ifWin();
        }
      })
    } else {
      this.setState(prevState => ({
        miss: prevState.miss + 1,
        missArray: [...missArray, board[row][col]]
      }), () => {
        if (this.state.miss >= 10) {
          console.log("You failed")
        }
      })
    }
  }
  setCounter() {
    const { amountOfSquares, time } = this.state
    setTimeout(() => {
      console.log('counter is started')
      this.setState({
        counterIsVisible: true
      })
    }, setDuration({ amountOfSquares, time }, 0))
  }
  renderBoardAndRoad() {
    const {
      firstSquare,
      board,
      partOfRoad,
      clickedRoad,
      missArray,
      road
    } = this.state
    // console.log(road)

    return board.map((row, i) => {
      return row.map((col, j) => {
        // console.log()
        // console.log();
        return (
          <Square
            firstSquare={firstSquare === col ? firstSquare : null}
            partOfRoad={partOfRoad}
            clickedRoad={clickedRoad}
            missArray={missArray}
            key={`${i}${j}`}
            row={i}
            col={j}
            handleClick={this.checkRoad}
            index={road.map((square, index) => (square === col ? index : null))}
          ></Square >
        );
      });
    });
  }
  render() {
    const { isButtonDisabled, buttonCaption, miss, level, counterIsVisible } = this.state;
    return (
      <div className="game">

        <div className="game__topbox">
          <span className="game__parameter">Level {level}</span>
          {counterIsVisible ? <Counter /> : false}
          <span className="game__parameter">&#10084; {10 - miss} </span>
        </div>
        <div className="game__board">{this.renderBoardAndRoad()}</div>
        <button className={isButtonDisabled ? "game__button game__button--disabled" : "game__button"} disabled={isButtonDisabled} onClick={this.buttonListener}>
          {buttonCaption}
        </button>
      </div>
    );
  }
}

export default Board;

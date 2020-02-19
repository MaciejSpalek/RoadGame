import React from "react";
import Square from "./Square";
import classNames from "classnames";
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
      time: 500,
      amountOfSquares: 5,
      firstSquare: null,
      lastClickedIndex: 0,
      miss: 0,
      level: 1,
      buttonCaption: "START",
      topBoxInformation: "",

      // flags
      isButtonDisabled: false,
      isDeletingMiss: false,
      areSquaresLocked: true,
      counterIsVisible: false,
      isBusyArray: false
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
    this.setState({
      isBusyArray: false
    })
    for (let i = 0; i < this.state.amountOfSquares; i++) {
      if (this.state.isBusyArray) {
        // console.log(i, "isBusyArray: true")
        break;
      } else {
        // console.log(i, "isBusyArray: false");
        this.setSingleSquare(roadArray, firstSquare, i);
      }
    }
    // console.log("Current road -->", this.state.road)
    if (!this.state.isBusyArray) {
      this.setState({ road: roadArray });
      // console.log("Set road -->", this.state.road)
    }
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
    if (!this.state.busyArray.includes(direction)) {
      this.setState({
        busyArray: [...this.state.busyArray, direction]
      })
    }
  }
  setSingleSquare(roadArray, firstSquare, i) {
    if (this.state.busyArray.length > 3) {
      this.setState({
        road: [],
        busyArray: [],
        isBusyArray: true
      })
      // console.log("Cleaned road -->", this.state.road, this.state.busyArray, this.state.isBusyArray)
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
        // console.log(`Direction ===> ${direction}, Square[${row - 1}][${col}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i);
      }
    }

    // right
    else if (direction === 1) {
      // console.log("right");

      if (col + 1 <= 9 && !this.isBusySquare(roadArray, row, col + 1)) {
        firstSquare = board[row][col + 1];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        // console.log(`Direction ===> ${direction}, Square[${row}][${col + 1}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }

    // down
    else if (direction === 2) {
      // console.log("down");

      if (row + 1 <= 9 && !this.isBusySquare(roadArray, row + 1, col)) {
        firstSquare = board[row + 1][col];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        // console.log(`Direction ===> ${direction}, Square[${row + 1}][${col}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }

    // left
    else if (direction === 3) {
      // console.log("left");

      if (col - 1 >= 0 && !this.isBusySquare(roadArray, row, col - 1)) {
        firstSquare = board[row][col - 1];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
        // console.log(`Direction ===> ${direction}, Square[${row}][${col - 1}], ITER: ${i}`);
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }
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
    await this.setCounter();
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
  win() {
    this.setState({
      areSquaresLocked: true
    })
    setTimeout(() => {
      this.setState(prevState => ({
        isButtonDisabled: false,
        missArray: [],
        road: [],
        clickedRoad: [],
        partOfRoad: [],
        firstSquare: null,
        level: prevState.level + 1,
        amountOfSquares: prevState.amountOfSquares + 2,
        lastClickedIndex: 0,
        buttonCaption: "NEXT LEVEL",
      }))
    }, 1000);
  }

  gameOver() {
    this.setState({
      // isButtonDisabled: true,
      areSquaresLocked: true,
      isGameOver: true 
    })
    setTimeout(() => {
      this.setState(prevState => ({
        isButtonDisabled: false, // turn on button
        isGameOver: false,
        clickedRoad: [],
        partOfRoad: [],
        missArray: [],
        road: [],

        buttonCaption: "START",
        lastClickedIndex: 0,
        amountOfSquares: 3, // to change
        firstSquare: null,
        level: 1,
        miss: 0
      }))
    }, 6000);
  }
  deleteInformation() {
    setTimeout(() => {
      this.setState({
        topBoxInformation: "",
      })
    }, 1000);
  }
  deleteMiss(array) {
    setTimeout(() => {
      this.setState({
        missArray: this.deleteLastArrayElement(array),
        isDeletingMiss: false
      })
    }, 1000);
  }
  deleteLastArrayElement(array) {
    return array.slice(0, array.length);
  }
  checkRoad = (currentSquare, index, e) => {
   e.preventDefault()
   const { clickedRoad, missArray, road, areSquaresLocked, firstSquare, lastClickedIndex, isDeletingMiss } = this.state;
   const currentIndex = index.filter(el => typeof el == "number" ? el + 1 : null)[0];
   
    // prevent clicking in clickedSquare, missSquare, firstSquare and if isDeletingMiss
    if (areSquaresLocked ||
      clickedRoad.includes(currentSquare) ||
      missArray.includes(currentSquare) ||
      currentSquare === firstSquare ||
      isDeletingMiss)
      return;

    // if hit agrees with lastClicked
    if (currentIndex == lastClickedIndex) {
      console.log("Clicked in correct square")
      this.setState(prevState => ({
        lastClickedIndex: prevState.lastClickedIndex + 1,
        clickedRoad: [...prevState.clickedRoad, currentSquare],
        topBoxInformation: "Nice shot!"
      }), () => {
        this.deleteInformation()
        if (this.state.lastClickedIndex === road.length) {
          console.log("You got it everything")
          this.win();
        }
      })
    } 

    // if hit includes in roadArray but doesn't agree with lastClicked
    else if(road.includes(currentSquare) && currentIndex != lastClickedIndex) {
      console.log("Clicked in square from road, but lastClicked isn't correct")
      this.setState(prevState => ({
        miss: prevState.miss + 1,
        missArray: [...missArray, currentSquare],
        topBoxInformation: "Wrong order!",
        isDeletingMiss: true
      }), () => {
        if (this.state.miss >= 10) {
          console.log("You failed")
          this.gameOver();
        }
      })
      this.deleteMiss(missArray)
      this.deleteInformation()
    }

    else {
      console.log("Incorrect square")
      this.setState(prevState => ({
        miss: prevState.miss + 1,
        missArray: [...missArray, currentSquare],
        topBoxInformation: "Miss!"
      }), () => {
        this.deleteInformation()
        if (this.state.miss >= 10) {
          console.log("You failed")
          this.gameOver();
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
  renderBoard() {
    const {
      firstSquare,
      board,
      partOfRoad,
      clickedRoad,
      missArray,
      road
    } = this.state

    return board.map((row, i) => {
      return row.map((col, j) => {
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
    const { isButtonDisabled, buttonCaption, miss, level, counterIsVisible, topBoxInformation, isGameOver } = this.state;
    const informationClass = classNames({
      "game__information game__information--correct" : this.state.topBoxInformation == "Nice shot!",
      "game__information game__information--wrong" : this.state.topBoxInformation == "Wrong order!",
      "game__information game__information--miss" : this.state.topBoxInformation == "Miss!",
      "game__information game__information--none" : this.state.topBoxInformation == "",
    })

    return (
      <div className="game">
        <div className="game__topbox">
          <span className="game__parameter">Level {level}</span>
          {counterIsVisible ? <Counter /> : false}
          <span className={informationClass}> { topBoxInformation }</span>
          <span className="game__parameter">&#10084; {10 - miss} </span>
        </div>
        <div className="game__board">
          <span className={ isGameOver ? "board__gameOverCaption" : "board__gameOverCaption--none"  }></span>
          {
            this.renderBoard()
          }
        </div>
        <button className={isButtonDisabled ? "game__button game__button--disabled" : "game__button"} disabled={isButtonDisabled} onClick={this.buttonListener}>
          {buttonCaption}
        </button>
      </div>
    );
  }
}

export default Board;

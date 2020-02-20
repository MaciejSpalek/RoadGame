import React from "react";
import Square from "./Square";
import classNames from "classnames";
import { setDuration } from "./lib/helpers"
import Counter from "./Counter/Counter";
import ButtonOfLevel from "./ButtonOfLevel/ButtonOfLevel"

class Game extends React.Component {
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
      amountOfSquares: 3,
      firstSquare: null,
      lastClickedIndex: 0,
      miss: 0,
      level: 1,
      buttonCaption: "Start",
      topBoxInformation: "",
      amountOfLives: 15,

      // flags
      isButtonDisabled: true,
      isDeletingMiss: false,
      areSquaresLocked: true,
      isCounterVisible: false,
      isBusyArray: false,
      isButtonsOfLevelVisible: true,
      isChangeLevelButtonDisabled: false
    }
    this.handleStart = this.handleStart.bind(this);
    this.checkRoad = this.checkRoad.bind(this)
    this.timeForDrawId = null;
    this.timeForHideId = null;
  }
  componentDidMount() {
    this.setState({
      board: this.createBoard(),
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
  }
  setRoad = firstSquare => {
    const roadArray = [];
    this.setState({
      isBusyArray: false
    })
    for (let i = 0; i < this.state.amountOfSquares; i++) {
      if (this.state.isBusyArray) { break } 
      else {this.setSingleSquare(roadArray, firstSquare, i);}
    }
    if (!this.state.isBusyArray) {
      this.setState({ road: roadArray });
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
    // up
    if (direction === 0) {
      if (row - 1 >= 0 && !this.isBusySquare(roadArray, row - 1, col)) {
        firstSquare = board[row - 1][col];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i);
      }
    }

    // right
    else if (direction === 1) {
      if (col + 1 <= 9 && !this.isBusySquare(roadArray, row, col + 1)) {
        firstSquare = board[row][col + 1];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }

    // down
    else if (direction === 2) {
      if (row + 1 <= 9 && !this.isBusySquare(roadArray, row + 1, col)) {
        firstSquare = board[row + 1][col];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
      } else {
        this.setBusyState(direction)
        return this.setSingleSquare(roadArray, firstSquare, i)
      }
    }

    // left
    else if (direction === 3) {
      if (col - 1 >= 0 && !this.isBusySquare(roadArray, row, col - 1)) {
        firstSquare = board[row][col - 1];
        roadArray.push(firstSquare);
        this.setState({
          busyArray: []
        })
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
  handleStart = async () => {
    await this.setState({
      isButtonDisabled: true,
      isWin: false,
      isChangeLevelButtonDisabled: true
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
        isCounterVisible: false
      })
    }, setDuration({ amountOfSquares, time }, 5500))
  }
  win() {
    this.setState({
      areSquaresLocked: true
    })
    setTimeout(() => {
      this.setState(prevState => ({
        level: prevState.level + 1,
        amountOfSquares: prevState.amountOfSquares + 2,
        buttonCaption: "Next level",
        topBoxInformation: "",
        areSquaresLocked: true
      }))
      this.cleanStateOfGame()
    }, 1000);
  }
  gameOver() {
    this.setState({
      areSquaresLocked: true,
      isGameOver: true
    })
    setTimeout(() => {
      this.setState({
        areSquaresLocked: true,
        isGameOver: false,
        buttonCaption: "Start",
        topBoxInformation: "",
        level: 1,
        amountOfLives: 15,
        miss: 0,
        isButtonsOfLevelVisible: true
      })
      this.cleanStateOfGame()
    }, 4000);
  }
  deleteInformation() {
    setTimeout(() => {
      this.setState({
        topBoxInformation: "",
        areSquaresLocked: false
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
      this.setState(prevState => ({
        lastClickedIndex: prevState.lastClickedIndex + 1,
        clickedRoad: [...prevState.clickedRoad, currentSquare],
        topBoxInformation: "Nice shot!",
        areSquaresLocked: true
      }), () => {
        if (this.state.lastClickedIndex === road.length) {
          this.win();
        } else {
          this.deleteInformation()
        }
      })
    }

    // if hit includes in roadArray but doesn't agree with lastClicked
    else if (road.includes(currentSquare) && currentIndex != lastClickedIndex) {
      this.setState(prevState => ({
        miss: prevState.miss + 1,
        missArray: [...missArray, currentSquare],
        topBoxInformation: "Wrong order!",
        isDeletingMiss: true,
        areSquaresLocked: true
      }), () => {
        if (this.state.miss >= this.state.amountOfLives) {
          this.gameOver();
        } else {
          this.deleteMiss(missArray)
          this.deleteInformation()
        }
      })
    }

    else {
      this.setState(prevState => ({
        miss: prevState.miss + 1,
        missArray: [...missArray, currentSquare],
        topBoxInformation: "Miss!",
        areSquaresLocked: true
      }), () => {
        if (this.state.miss >= this.state.amountOfLives) {
          this.gameOver();
        } else {
          this.deleteInformation()
        }
      })
    }
  }
  setCounter() {
    const { amountOfSquares, time } = this.state
    setTimeout(() => {
      console.log('counter is started')
      this.setState({
        isCounterVisible: true,
        isChangeLevelButtonDisabled: false
      })
    }, setDuration({ amountOfSquares, time }, 0))
  }
  setDifficultyLevel = (amountOfSquares, time, amountOfLives) => {
    this.setState({
      amountOfSquares: amountOfSquares,
      amountOfLives: amountOfLives,
      time: time,
      isButtonsOfLevelVisible: false,
      isButtonDisabled: false,
      isCounterVisible: false,
    })
    this.cleanStateOfGame();
  }
  handleChangeLevel = () => {
    this.setState({
      isButtonsOfLevelVisible: true,
      level:1
    })
    this.cleanStateOfGame();
  }
  cleanStateOfGame() {
    this.setState({
      missArray: [],
      road: [],
      clickedRoad: [],
      partOfRoad: [],
      firstSquare: null,
      areSquaresLocked: true,
      isButtonDisabled: false, // turn on button
      lastClickedIndex: 0,
    })
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
    const { 
      isButtonDisabled, 
      buttonCaption, 
      miss, 
      level, 
      isCounterVisible, 
      topBoxInformation, 
      isGameOver, 
      amountOfLives, 
      isButtonsOfLevelVisible, 
      isChangeLevelButtonDisabled 
    } = this.state;

    const informationClass = classNames({
      "game__information game__information--correct": this.state.topBoxInformation == "Nice shot!",
      "game__information game__information--wrong": this.state.topBoxInformation == "Wrong order!",
      "game__information game__information--miss": this.state.topBoxInformation == "Miss!",
      "game__information game__information--none": this.state.topBoxInformation == "",
    })

    const Easy = "Easy"
    const Normal = "Normal"
    const Expert = "Expert"

    return (
      <div className="game">
        <div className="game__topbox">
          <span className="game__parameter">Map {level}</span>
          {isCounterVisible ? <Counter /> : false}
          <span className={informationClass}> {topBoxInformation}</span>
          <span className="game__parameter">&#10084; {amountOfLives - miss} </span>
        </div>
        <div className="game__board">
          <span className={isGameOver ? "board__gameOverCaption" : "board__gameOverCaption--none"}></span>
          {this.renderBoard()}
        </div>
        <button
          className={isButtonDisabled ? "game__button game__button--disabled" : "game__button"}
          disabled={isButtonDisabled}
          onClick={this.handleStart}>
          {buttonCaption}
        </button>
        <button
          className={isChangeLevelButtonDisabled ? "game__button game__button--disabled" : "game__button"}
          onClick={this.handleChangeLevel}
          disabled={isChangeLevelButtonDisabled}
        >
          Change level
          </button>
        {isButtonsOfLevelVisible ?
          
            <div className="game__start-layer">
              <div className="game__inner-wrapper">
                <div>
                  <h1 className="game__title">Road Game</h1>
                  <p className="game__subtitle">Chose your path or die!</p>
                </div>
                <div className="game__buttonBox">
                <ButtonOfLevel
                  handleClick={this.setDifficultyLevel}
                  nameLevel={Easy}
                  amountOfSquares={3}
                  time={1500}
                  amountOfLives={15} 
                />
                <ButtonOfLevel
                  handleClick={this.setDifficultyLevel}
                  nameLevel={Normal}
                  amountOfSquares={6}
                  time={1000}
                  amountOfLives={10} 
                />
                <ButtonOfLevel
                  handleClick={this.setDifficultyLevel}
                  nameLevel={Expert}
                  amountOfSquares={9}
                  time={500}
                  amountOfLives={5} 
                />
              </div>
              </div>
            </div>
          
          : null}
      </div >
    );
  }
}

export default Game;

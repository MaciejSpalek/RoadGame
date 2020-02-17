import React from "react";
import { Square } from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrays
      board: [],
      road: [],
      clickedRoad: [],
      missArray: [],

      // variables
      dimension: 10,
      time: 1000,
      amountOfSquares: 3,
      firstSquare: null,
      lastClickedIndex: 0,
      miss: 0,

      // flags
      isButtonDisabled: false,
      isStarted: false,
      isWin: false,
      isLocked: true,
      isButtonClicked: false,
      isVisible: false,
      draw: ""
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
  setTime(myTime) {
    const { amountOfSquares, time } = this.state;
    return (amountOfSquares * time) + myTime;
  }
  getDirection() {
    return Math.round(Math.random() * 3);
  }
  isStarted() {
    this.setState({
      isStarted: true
    })
  }
  unlockSquares() {
    setTimeout(() => {
      this.setState({
        isLocked: false
      })
    }, this.setTime(5000))
  }
  buttonListener = async () => {
    await this.setState({
      isButtonDisabled: true,
      isButtonClicked: true,
      isWin: false
    })
    await this.drawFirstSquare();
    await this.isStarted();
    await this.unlockSquares();
    await this.updateRoad();
  }


  async wait(duration) {
    await this.setDrawRoad({
      draw: "drawRoad", 
      isVisible: true
    }, duration)
    
    if (this.timeForDrawId > 30) {
      window.clearTimeout(this.timeForDrawId)
      this.timeForDrawId = null
    }
  }

   setDrawRoad(newState, duration) {
    if (this.state.isRunning) {
      return new Promise((resolve, reject) => {
        this.timeForDrawId = setTimeout(() => {
          this.setState(newState, () => {
            resolve()
          })
        }, duration)
      })
    }
  }

  // setSquareDuration(road, col) {
  //   const durationArray = road.map((square, index) => (square === col ? (index + 1) * 500 : null));
  //   const durationElement = durationArray.filter(square => typeof square === "number")[0];
  //   if(typeof durationElement === "number") {
  //     return durationElement;
  //   } else {
  //     return null;
  //   } 
  // }

  setSquareDuration(road, col) {
    const durationArray = road.map((square, index) => (square === col ? (index + 1) * 500 : null));
    const durationElement = durationArray.filter(square => typeof square === "number")[0];
    return durationElement;
  }


  updateRoad() {
    const { partOfRoad, duration, road, board } = this.state;
    board.map((row) => {
      row.map((col) => {
        if(col == road.filter(roadSquare => roadSquare == col ? col: null)[0]) {
          const duration = this.setSquareDuration(road, col);
          console.log(duration)
          this.wait(duration);
        }
        // console.log(road.filter(roadSquare => roadSquare == col ? col: null)[0])
        
        // console.log(col)
          
          // console.log(col, roadSquare)
        
      })
    })
    // road.filter(part => (part === col ? part : null))
    // if (road.filter(part => (part === col ? part : null))[0] === `${row}${col}`) {
    //   this.wait(duration.filter(el => typeof el == "number" ? el : null)[0]);
    // }

    // if()
  }

  ifWin() {
    setTimeout(() => {
    this.setState({
      isButtonDisabled: false, // turn on button
      isButtonClicked: false,
      isStarted: false, 
      isLocked: true, // disable click on squares
      isWin: true, 

      clickedRoad: [],
      missArray: [],
      road: [],
     
      lastClickedIndex: 0,
      firstSquare: null,
      miss: 0,
      
      
    })
   }, 1000);
   
  }

  checkRoad = (row, col, e) => {
    e.preventDefault()
    const { clickedRoad, missArray, board, road, isLocked, firstSquare } = this.state;
    if (isLocked || 
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
        if (this.state.miss > 2) {
          console.log("You failed")
        }
      })
    }
  }

  renderBoardAndRoad() {
    const { 

      isButtonClicked,
      isStarted,
      isVisible,
      isLocked, 
      isWin, 
      
      firstSquare,
      board,
      road, 
      time, 
      draw,
       
      clickedRoad, 
      missArray, 
      amountOfSquares, 
     
    } = this.state

    return board.map((row, i) => {
      return row.map((col, j) => {
        return (
          <Square
            //map and filter
            // duration={this.setSquareDuration(this.state.road, col)} 

            // index={road.map((square, index) => (square === col ? index : null))} 
            // partOfRoad={road.filter(part => (part === col ? part : null))}
            firstSquare={firstSquare === col ? firstSquare : null}

            // variables
            amountOfSquares={amountOfSquares}
            clickedRoad={clickedRoad}
            missArray={missArray}
            key={`${i}${j}`}
            time={time}
            row={i}
            col={j}

            // flags
            isButtonClicked={isButtonClicked}
            isvisible={isVisible}
            isStarted={isStarted}
            isLocked={isLocked}
            isWin={isWin}
            road={road}
            draw={draw}

            // handlers
            handleClick={this.checkRoad}
          ></Square>
        );
      });
    });
  }
  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div className="game">
        <div className="board">{this.renderBoardAndRoad()}</div>
        <button disabled={isButtonDisabled} className="game__start-button" onClick={this.buttonListener}>
          START
        </button>
      </div>
    );
  }
}

export default Board;

import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            dimension: 10
        }
    }
    // w momencie włączenia komponentu wyrenderowania go, odpala się
    // componentDidMount() {
        // this.createBoard();
    // }
    // function createGameField(array, board, dimension) {
    //     for (let r = 0; r < dimension; r++) {
    //         array[r] = [];
    //         for (let c = 0; c < dimension; c++) {
    //             array[r][c] = $("<div>").addClass('square');
    //             array[r][c].data('r', r);
    //             array[r][c].data('c', c);
    //             array[r][c].data('value', 0); // 0 - puste pole, 1 - otoczenie statku, 2 - element statku
    //             $(board).append(array[r][c]);
    //         }
    //     }
    // }
    // createBoard() {
    //     for (let row = 0; row < this.state.dimension; row++) {
    //         for (let col = 0; col < this.state.dimension; col++) {
    //             this.setState({
    //                 board: [col]
    //             });
    //            console.log(`[${row}][${col}]`);
    //         }
    //     }
    //     // return this.state.board;
    // }

    // createBoard() {
    //     let list = []
    //     for(row = 0; row < this.state.dimension; row++){
    //         for(col = 0; col < this.state.dimension; col++){
    //             console.log(db[i][j]);
    //             list.push(<li key={i+'-'+j}>{db[i][j]}</li>)
    //             // when rendering list of array elements, wee need unique key
    //         }
    //     }
    //     return list
    // }

    myList() {
        
        for(let i = 0; i < this.state.dimension; i++){
           for(let j = 0; j < this.state.dimension; j++){
                // console.log(this.state.board[i][j]);
                // this.setState({board: this.state.board.push(<div className="square" key={i+'-'+j}></div>)})
             this.state.board.push(<div className="square" key={i+'-'+j}></div>)
           }
        }
        return this.state.board;
      }
      
    render() {
        console.log(this.state.board);
        return (
            <div className="board"> {this.myList()} </div>
            
        )
    }  
}

export default Game;
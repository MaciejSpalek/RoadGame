import React, { Component } from 'react';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            dimension: 10,
            firstSquare: null
        }
        this.buttonListener = this.buttonListener.bind(this); 
    } 
    componentDidMount() {
        this.setState({
            board: this.myList()
        })
        
    }
    myList() {
        let list = []
        for (let row = 0; row < this.state.dimension; row++) {
            for (let col = 0; col < this.state.dimension; col++) {
                list.push(row + '-' + col)
            }
        }
        return list;
    }
    getRandom() {
        return Math.round(Math.random()*this.state.board.length)
    }
    drawFirstSquare() {
        return this.state.board[this.getRandom()];
    }
    buttonListener() {
        this.drawFirstSquare();
        this.setState(prevState => ({
            firstSquare: prevState.firstSquare
        }))
        console.log(this.state.firstSquare);
    }
    render() {
        
        return (
            <>
            <div className="board">
                {this.state.board.map((value) => {
                    return (
                        <Square value={value} key={value}></Square>
                    )
            })}
            </div>
            <button onClick = {this.buttonListener}> Start </button>
            </>
        )
    }
}







class Square extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this); 
    }
    handleSelect() {
        // console.log(this.getColumn());
        
    }
    getRandom() {
        return Math.round(Math.random()*3)
    }
    getRow() {
        return this.props.value.substr(0, 1);
    }
    getColumn() {
        return this.props.value.substr(2, 1);
    }
    render() {
        return (
            <div className="square" onClick={this.handleSelect}></div>
        )
    }
}

export default Board;
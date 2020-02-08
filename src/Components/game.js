import React, { Component } from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            dimension: 10
        }
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
    
    render() {
        return (
            <div className="board">
                {this.state.board.map((value) => {
                    return (
                        <Square value={value} key={value}></Square>
                    )
            })}
            </div>
        )
    }
}

class Square extends React.Component  {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this); 
    }

    handleSelect() {
        // console.log(this.props.value);
        console.log(this.getColumn());
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
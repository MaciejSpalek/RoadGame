import React from 'react';

class Board extends React.Component {
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
        return this.state.board[Math.round(Math.random() * this.state.board.length)]
    }
    drawFirstSquare() {
        let randomFiled = this.getRandom();
        this.setState({
            firstSquare: randomFiled
        }, console.log(randomFiled))
    }
    buttonListener() {
        this.drawFirstSquare();
    }
    render() {
        const { firstSquare } = this.state;
        return (
            <><div className="game">
                <div className="board">
                    {this.state.board.map((value) => {
                        return (
                            <Square
                                firstSquare={firstSquare === value ? firstSquare : null}
                                value={value}
                                key={value}>
                            </Square>
                        )
                    })}
                </div>
                <button className="game__start-button" onClick={this.buttonListener}> Start </button>
            </div>
            </>
        )
    }
}







class Square extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect() {
        // console.log(this.getColumn());
        console.log(this.props.firstSquare);

    }
    getRandom() {
        return Math.round(Math.random() * 3)
    }
    getRow() {
        return this.props.value.substr(0, 1);
    }
    getColumn() {
        return this.props.value.substr(2, 1);
    }
    render() {
        const { firstSquare, value } = this.props
        return (
            <div className={firstSquare === value ? "blackSquare" : "square"} onClick={this.handleSelect}></div>
        )
    }
}

export default Board;
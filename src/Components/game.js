import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            dimension: 10
        }
    } componentDidMount() {
        this.setState({
            board: this.myList()
        })
    }
    myList() {
        let list = []
        for (let i = 0; i < this.state.dimension; i++) {
            for (let j = 0; j < this.state.dimension; j++) {
                // console.log(this.state.board[i][j]);
                // this.setState({board: this.state.board.push(<div className="square" key={i+'-'+j}></div>)})
                list.push(i + '-' + j)
                // this.setState({ board: <div className="square" key={i + `-` + j} ></div> })
            }
        }
        return list;
    }
    render() {
        return (
            <div className="board">{this.state.board.map((value) => {
                console.log(value);
                return (
                    <SquareItem key={value}></SquareItem>
                )
            })}
            </div>
        )
    }
}

function SquareItem(props) {
    return (
        <div className="square">{props.value}</div>
    )
}

export default Game;
import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [1, 3, 4]
        }
    }
    
    render() {
        console.log(this.state.board);
        return (
            <div></div>
        )
    }  
}

export default Game;
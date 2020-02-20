import React from "react"

const ButtonOfLevel = ({ handleClick, nameLevel, amountOfSquares, amountOfLives, time }) => {
    return (
        <button
            className="game__level-button game__button"
            onClick={() => handleClick(amountOfSquares, time, amountOfLives)}
        >
            {nameLevel}
        </button>
    )
}

export default ButtonOfLevel;
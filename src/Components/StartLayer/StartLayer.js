import React from 'react'
import ButtonOfLevel from "../ButtonOfLevel/ButtonOfLevel"


export default function StartLayer({ setDifficultyLevel, handleToggleIntro }) {
    const Easy = "Easy"
    const Normal = "Normal"
    const Expert = "Expert"
    return (
        <div className="game__start-layer">
            <div>
                <h1 className="game__title">Road Game</h1>
                <p className="game__subtitle">Chose your path or die!</p>
            </div>
            <ul className="game__button-box">
                <ButtonOfLevel
                    handleClick={setDifficultyLevel}
                    nameLevel={Easy}
                    amountOfSquares={3}
                    time={800}
                    amountOfLives={15}
                    counterTime={6}
                />
                <ButtonOfLevel
                    handleClick={setDifficultyLevel}
                    nameLevel={Normal}
                    amountOfSquares={6}
                    time={600}
                    amountOfLives={10}
                    counterTime={4}
                />
                <ButtonOfLevel
                    handleClick={setDifficultyLevel}
                    nameLevel={Expert}
                    amountOfSquares={9}
                    time={300}
                    amountOfLives={5}
                    counterTime={2}
                />
            </ul>
            <button
                onClick={() => handleToggleIntro()}
                className="game__intro-button game__button">
                Intro
            </button>
        </div>
    )
}

import React from 'react'
import step_1 from "../../Images/step_1.png"
import step_2 from "../../Images/step_2.png"
import step_3 from "../../Images/step_3.png"
import step_4 from "../../Images/step_4.png"
import close from "../../Images/close.svg"


export default function Intro() {
    return (
        <main className="introduction">
            <div className="introduction__wrapper">
                <header className="introduction__header">
                    <h3 className="introduction__title">Hello in RoadGame</h3>
                    <span className="introduction__propose">Look at the simple introduction for the game.</span>
                </header>
                <ul className="introduction__list">
                    <li className="introduction__item">
                        <span className="introduction__step">Step 1</span>
                        <img className="introduction__image" src={step_1} alt="introduction_image" />
                        <p className="introduction__description">At the beginning, choose the game level.</p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 2</span>
                        <img className="introduction__image" src={step_2} alt="introduction_image" />
                        <p className="introduction__description">OK! Click start and look at the board where AI drawing road and remember in order road parts</p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 3</span>
                        <img className="introduction__image" src={step_3} alt="introduction_image" />
                        <p className="introduction__description">Next, click in order parts of the road. Warning! If you miss or click in not order, you lose lives</p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 4</span>
                        <img className="introduction__image" src={step_4} alt="introduction_image" />
                        <p className="introduction__description">If you click in order all of the road parts, you are going to the next board with one additional part of the road. All levels have ten boards level. If you win all levels you are an expert and you don't need to eat nuts! Have fun</p>
                    </li>
                </ul>
                <button className="introduction__button"><img className="introduction__button-icon" src={close} alt="close-icon"></img></button>
            </div>
        </main>
    )
}

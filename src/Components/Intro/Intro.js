import React from 'react'
import step_1 from "../../Images/step_1.png"
import step_2 from "../../Images/step_2.png"
import step_3 from "../../Images/step_3.png"
import step_4 from "../../Images/step_4.png"
import close from "../../Images/close.svg"


export default function Intro({ handleToggleIntro }) {
    return (
        <div className="introduction">
            <div className="introduction__wrapper scroll">
                <header className="introduction__header">
                    <h3 className="introduction__title">Hello in RoadGame</h3>
                    <span className="introduction__propose">Don't you know what's going on?</span>
                    <br></br>
                    <span className="introduction__propose">So come with me...</span>
                </header>
                <ul className="introduction__list">
                    <li className="introduction__item">
                        <span className="introduction__step">Step 1</span>
                        <img className="introduction__image" src={step_1} alt="introduction_image" />
                        <p className="introduction__description">Firstly, choose one game level.</p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 2</span>
                        <img className="introduction__image" src={step_2} alt="introduction_image" />
                        <p className="introduction__description">Click start and try to remember whole road in correct order.</p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 3</span>
                        <img className="introduction__image" src={step_3} alt="introduction_image" />
                        <p className="introduction__description">Click in the consecutive parts of the road. Warning! If you miss or click in incorrect order, you lose one life.</p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 4</span>
                        <img className="introduction__image" src={step_4} alt="introduction_image" />
                        <p className="introduction__description">If everything goes well, you're gonna go to the next board with additional parts of the road. If you finish all ten boards on three different difficulty levels you'll become an expert and you don't need to eat nuts! Have fun!</p>
                    </li>
                </ul>
                <button onClick={() => handleToggleIntro()} className="introduction__button"><img className="introduction__button-icon" src={close} alt="close-icon"></img></button>
            </div>
        </div>
    )
}

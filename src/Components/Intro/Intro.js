import React from 'react'
import step_1 from "../../Images/step_1.png"
import step_2 from "../../Images/step_2.png"
import step_3 from "../../Images/step_3.png"
import step_4 from "../../Images/step_4.png"


export default function Intro() {
    return (
        <main className="introduction">
            <div className="introduction__wrapper">
                <header className="introducion__header">
                    <h3 className="introduction__title">Hello in RoadGame</h3>
                    <span>lorem ipsum </span>
                </header>
                <ul className="introduction__list">
                    <li className="introduction__item">
                        <span className="introduction__step">Step 1</span>
                        <img className="introduction__image" src={step_1} alt="introduction_image" />
                        <p className="introduction__description"></p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 2</span>
                        <img className="introduction__image" src={step_2} alt="introduction_image" />
                        <p className="introduction__description"></p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 3</span>
                        <img className="introduction__image" src={step_3} alt="introduction_image" />
                        <p className="introduction__description"></p>
                    </li>
                    <li className="introduction__item">
                        <span className="introduction__step">Step 4</span>
                        <img className="introduction__image" src={step_4} alt="introduction_image" />
                        <p className="introduction__description"></p>
                    </li>
                </ul>
                <button className="introduction__button">Close</button>
            </div>
        </main>
    )
}

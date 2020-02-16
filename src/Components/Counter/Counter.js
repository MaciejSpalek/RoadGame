import React, { useState, useEffect } from "react"

const Counter = () => {
    const [counter, setCounter] = useState(5)
    useEffect(() => {
        counter > 0 && setTimeout(() => {
            setCounter(counter - 1)
        }, 1000)
    }, [counter])
    return (
        <span className="counter" >Countdown: {counter}</span>
    )
}

export default Counter;
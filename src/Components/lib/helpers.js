
const setDuration = ({ amountOfSquares, time }, myTime) => {
    return (amountOfSquares * time) + myTime;
}

const getDirection = () => {
    return Math.round(Math.random() * 3);
}

const deleteLastArrayElement = (array) => {
    return array.slice(0, array.length);
}

export { setDuration, getDirection, deleteLastArrayElement };
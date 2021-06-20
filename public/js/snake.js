import { getInputDirection } from "./input.js"
let url = "/mySnake";
    let results =  await fetch(url, { 
        method: 'GET',
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    const person = await results.json();
    //console.log(person)
    var score = 0
    person.points = score
// changes the speed that the snake moves. 
export const snakeSpeed = 8
const snakeBody = [
    {x: 11, y: 11}
]
let newSegments = 0;
score = parseInt(newSegments)
export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >=0; i--){
        snakeBody[i + 1] = {...snakeBody [i] }
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}
export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })
}
export function expandSnake(amount){
    newSegments += amount
}
// ignoreHead included so the code knows to ignore the head of the snake intersecting with the head of the snake. yes, head of the snake. 
export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) =>{
        if(ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}
export function getSnakeHead() {
    return snakeBody[0]
}
export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}
const updateScore = async () => {
    //person.points = score
    let url = "/newScore"; 
    let newScore =  await fetch(url, { 
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
           points: score,
        })
    });
    //let points = await newScore.json();
    console.log(newScore)
}
function equalPositions(pos1, pos2) {
    // return pos1.x === pos2.x && pos1.y === pos2.y
    if (pos1.x === pos2.x && pos1.y === pos2.y) {
            score += 1;
            document.getElementById('score').innerHTML = score
            updateScore()
            return pos1.x === pos2.x && pos1.y === pos2.y
    }
}
function addSegments(){
    for (let i = 0; i < newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0
}
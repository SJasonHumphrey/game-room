import { onSnake, expandSnake} from "./snake.js"
import {randomGridPosition} from './grid.js'

let food = getRandomFoodPosition()
// the amount of boxes that gets added to the snake everytime you eat a piece of food. 
const expansionRate = 2

export function update() {
    if(onSnake(food)){
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }
}
export function draw(gameBoard) {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add("food")
        gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition(){
    let newFoodPosition 
    // this lets us get a new random position and makes sure that the new random position is not one where the snake currently is. 
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}
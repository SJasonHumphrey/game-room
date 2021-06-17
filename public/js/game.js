import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection } from './snake.js' 
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid} from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

// main game
function main (currentTime) {

    if(gameOver){
        if(confirm('You lost. Press ok to restart.')) {
            // update this website to bring you back to the beginning of the game. 
            window.location = "/snake";
        } else{
               // update this to redirect you to another webpage when you press cancel.
            window.location ="/"
        }
        return
    }

    // lets the game update in realtime. can change the speed of update by increasing SnakeSpeed variable.
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime

    update()
    draw()

}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    // innerHTML makes it so the snake moves without keeping the old tiles there. 
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
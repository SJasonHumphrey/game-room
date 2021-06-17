document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('showScore')
    const plusOrMinus = document.getElementById('plusOrMinus')
    const width = 8
    const squares = []

    //going to add an option to restart the game with a button
    const restart = document.getElementById('restartGame')
    restart.addEventListener('click', ()=>{
        location.reload();
    })

    let score = 0

    //now i'm going to try and add a timer
    const timeLeftDisplay = document.getElementById('timeLeft') 
    let timeLeft = 90
    
    function runTimer(){
        if(timeLeft > -1) {
            timeLeft -= 1
            timeLeftDisplay.innerHTML = `You have ${timeLeft} seconds left`
            if (timeLeft === 0){
                window.alert(`Times Up! You finished with ${score} brownie points!`)
                stopTimer();
            }   
        }
    };
    const timerInterval = setInterval(runTimer, 1000);
    function stopTimer(){
        clearInterval(timerInterval);
    }


//create colors in an array
    const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
]
//afterwards I went and added the url with corresponding candy color
//so that the candy showed up instead of the color.
//then we went through the entire file and replaced every instance of background Color to 

// create a board
function createBoard(){
    for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        //I want to make my squares drag-able 
        square.setAttribute('draggable', true)
        //BUT how do we know where we will be dragging these squares to!? we need to set an id for our squares
        square.setAttribute('id', i)
        //we want to assign the boxes a random color. We want it be a whole interger so we use math.floor
        //math.random selects a random number between 1 and candyColors.length(which is 6)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        //now we want to assign the background color to the square
        square.style.backgroundImage = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()

// time to start dragging candies. 
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

//Need to use event listeners to drag
//there are five stages to dragging the candies. 
squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart(){
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(this.id, 'dragStart')
}

function dragOver(e){
e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
    console.log(this.id, 'dragEnter')
}

function dragLeave(){
    console.log(this.id, 'dragLeave')
}
function dragEnd(){
    console.log(this.id, 'dragOver')
    //now that we have the drag drop feature working and swapping color
    //we need to define what a valid move is. Right now you are able to swap any 
    //two squares from anywhere on the board. Not good.
    let validMoves = [squareIdBeingDragged -1, //this means the square to the left
        squareIdBeingDragged -width,//this means the square 8 squares back which would be on top of the current square
        squareIdBeingDragged +1, //this means the square to the right
        squareIdBeingDragged +width //this means the square 8 squares forward which would be below the current square
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if(squareIdBeingReplaced && validMove){
        squareIdBeingReplaced = null
    }
    else if(squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage =  colorBeingDragged
    }
    else
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

function dragDrop(){
    console.log(this.id, 'dragDrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

//refer to this part after reviewing logic for checking for matches
//now that we have got checking for matches in rows and columns of 3 and four time to make the existing blocks 
//move down into the blank spaces
function moveDown(){
    //so 55 this loops up to 55 because 55-64 would be the indexes that make up the last row from the top. 
    //we don't need cancides in the bottom row moving down
    for (i =0; i < 55; i++){
        // the logic here is if the index in the squares array + width(which would be 8)
        //which would then place the square we are comparing directly below the original square
        if (squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            // the logic above pretty much means if the square below index [i] background
            //color is blank, replace the blank background color with [i]. once the square below [i] 
            //has [i] color... now [i] will become blank
            squares[i].style.backgroundImage = ''
            //now we need it to fill back up with random colors if it is blank
            //so we need to write some logic to fill up to the first row
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            //this means if [i]s index includes any of the indecies listed in the array of firstRow
            //then it is in the first row. If that is true then I want...
            if (isFirstRow && squares[i].style.backgroundImage === ''){
                //if the [i] and any index between 0-7 are both blank
                let randomColor = Math.floor(Math.random() * candyColors.length)
                // that sets a random color for us that is a whole number...(the floor part.)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
}

// time to check for matches
// first we are going to check for rows of three
function checkRowForThree(){
    for(i = 0; i < 61; i++){
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        
        // we also need to define what indexes are not valid to check. 
        //we dont want a connection of three to count when the are on different rows
        //eg two blue on row 1 end and 1 blue on row 2 start
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        //this logic below is where we tell the program if i is one of these indexes above
        //we skip it
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = `Brownie Points: ${score}`
            plusOrMinus.innerHTML = `Awesome! +3 Points!`
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForThree()

//now lets check for column matches of three
function checkColumnForThree(){
    for(i = 0; i < 47; i++){
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = `Brownie Points: ${score}`
            plusOrMinus.innerHTML = "On a roll! +3 Points!"
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForThree()

//now I am literally going to copy and paste the logic for checking rows and colums of three and insert it for 4s
//this is where we check for rows of 4
function checkRowForFour(){
    //change to 60 because there are 64 boxes. 60 + 4 = 64//
    for(i = 0; i < 60; i++){
        let rowOfFour = [i, i+1, i+2, i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        
        // we also need to define what indexes are not valid to check. 
        //we dont want a connection of three to count when the are on different rows
        //eg two blue on row 1 end and 1 blue on row 2 start
        //(we are going to update the indexes of the check four to include the index before as well)
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        //this logic below is where we tell the program if i is one of these indexes above
        //we skip it
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4
            timeLeft += 1
            scoreDisplay.innerHTML = `Brownie Points: ${score}`
            plusOrMinus.innerHTML = "Brownie Bonus! 4 points + 1 sec!"
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForFour()

//now lets check for column matches of four
function checkColumnForFour(){
    for(i = 0; i < 47; i++){
        //adding the width*3 so that they can check to see if the 24th index from the starting index is a match too
        let columnOfFour = [i, i+width, i+width*2, width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4
            timeLeft += 1
            scoreDisplay.innerHTML = `Brownie Points: ${score}`
            plusOrMinus.innerHTML = "Delicious! 4 Points + 1 sec!"
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForFour()

//set interval so that function as ran every 100 milliseconds
window.setInterval(function(){
    //I want my squares to move down if the need to first
    moveDown()
    //I want to check for a connection of four before checking for a connection of three
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}, 100)


})


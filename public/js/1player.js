const snakeGame = document.querySelector('.snake');
console.log(snakeGame);
snakeGame.addEventListener('click', async (e) => {
    console.log(e.target)
    try {
        e.preventDefault();
        let id = e.target.id
        console.log(`this is id ----> ${id}`)  
        let url = `/snake${id}`;
        let results =  await fetch(url, { 
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8'}, 
            body: JSON.stringify({
                singlePlayerGameID: id 
            })
        });
    }
    catch (err) {
    }
        });
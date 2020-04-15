function findBestMove(blockArray){
    let bestVal = -Infinity;
    let moves = emptyPlaces(blockArray);
    let bestMove;
    for(let i=0; i<moves.length; i++){
        let temp = blockArray[moves[i]];
        blockArray[moves[i]] = computerMark;
        let moveVal = minimax(blockArray, 0, false);
        blockArray[moves[i]] = temp;
        if(moveVal>bestVal){
            bestVal = moveVal;
            bestMove = moves[i];
        }
    }
    return bestMove;
}

function minimax(blockArray, depth, isPlayer){
    score = winningLogic(blockArray);
    if(score !== 0)
        return score;
    if(!isEmpty(blockArray))
        return 0;
    let moves = emptyPlaces(blockArray);
    let best;
    if(isPlayer){
        best = -Infinity;
        for(let i=0; i<moves.length; i++){
            let temp = blockArray[moves[i]];
            blockArray[moves[i]] = computerMark;
            best = Math.max(best, minimax(blockArray, depth+1, !isPlayer));
            blockArray[moves[i]] = temp;
        }
        return best;
    }
    else{
        best = Infinity;
        for(let i=0; i<moves.length; i++){
            let temp = blockArray[moves[i]];
            blockArray[moves[i]] = userMark;
            best = Math.min(best, minimax(blockArray, depth+1, !isPlayer));
            blockArray[moves[i]] = temp;
        }
        return best;
    }
}

function emptyPlaces(blockArray){
    let places = []
    for(let i=0; i<blockArray.length; i++){
        if(blockArray[i].charCodeAt(0)>=97 && blockArray[i].charCodeAt(0)<=105){
            places.push(i);
        }
    }
    return places;
}

function isEmpty(blockArray){
    for(let i=0; i<blockArray.length; i++){
        if(blockArray[i].charCodeAt(0)>=97 && blockArray[i].charCodeAt(0)<=105){
            return true;
        }
    }
    return false;
}

function winningLogic(array){
    let winningMark = '';
    // checking rows
    if(array[0] === array[1] && array[1] === array[2]){
        winningMark = array[1] === 'X' ? 'X': 'O';
    }
    else if(array[3] === array[4] && array[4] === array[5]){
        winningMark = array[4] === 'X' ? 'X': 'O';
    }
    else if(array[6] === array[7] && array[7] === array[8]){
        winningMark = array[7] === 'X' ? 'X': 'O';
    }
    // checking columns
    else if(array[0] === array[3] && array[3] === array[6]){
        winningMark = array[3] === 'X' ? 'X': 'O';
    }
    else if(array[1] === array[4] && array[4] === array[7]){
        winningMark = array[4] === 'X' ? 'X': 'O';
    }
    else if(array[2] === array[5] && array[5] === array[8]){
        winningMark = array[5] === 'X' ? 'X': 'O';
    }
    //checking the diagonals
    else if(array[0] === array[4] && array[4] === array[8]){
        winningMark = array[4] === 'X' ? 'X': 'O';
    }
    else if(array[2] === array[4] && array[4] === array[6]){
        winningMark = array[4] === 'X' ? 'X': 'O';
    }
    if(winningMark === userMark){
        return -10;
    }
    else if(winningMark === computerMark){
        return 10;
    }
    return 0;
}

function play(blockArray){
    if(isEmpty(blockArray) && !won){
        let emptySpots = emptyPlaces(blockArray);
        let randomPosition = findBestMove(blockArray);
        tableData[randomPosition].textContent = computerMark;
        if(computerMark === 'O')
            tableData[randomPosition].classList.add("naught-select");
        else
            tableData[randomPosition].classList.add("cross-select");
        blockArray[randomPosition] = computerMark;
        console.log(blockArray[randomPosition]);
        let winningPlayer = winningLogic(blockArray);
        if(winningPlayer === 10 || winningPlayer === -10)
            won = true;
        else
            won = false;
        if(won)
            return winningPlayer;
    }
    else{
        won = true;
        return 0;
    }
}

let blockArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
let cross = document.querySelector(".cross");
let naught = document.querySelector(".naught");
let tableData = document.querySelectorAll("td");
let won = false;
let userMark = 'X';
let computerMark = 'O';
cross.addEventListener("click", function(){
    userMark = "X";
    computerMark = "O";
    this.classList.toggle("cross-select");
});
naught.addEventListener("click", function(){
    userMark = "O";
    computerMark = "X";
    this.classList.toggle("naught-select");
    play(blockArray);
});
let winner;
let declareWinner = document.getElementById("declare");
for(let i=0; i<tableData.length; i++){
    tableData[i].addEventListener("click", function(){
        if((blockArray[i].charCodeAt(0)>=97 && blockArray[i].charCodeAt(0)<=105) && !won){
            this.textContent = userMark;
            blockArray[i] = userMark;
            if(userMark === 'X')
                this.classList.add("cross-select");
            else
                this.classList.add("naught-select");
            console.log(blockArray);
            if(winningLogic(blockArray)){
                winner = winningLogic(blockArray);
                won = true;
                console.log(winner);
            }
            else
                winner = play(blockArray);
        }
        if(isEmpty(blockArray) === false){
            won = true;
        }
        if(won){
            if(winner === 10){
                declareWinner.textContent = `The Winner is ` + computerMark;
            }
            else if(winner === -10){
                declareWinner.textContent = `The Winner is ` + userMark;
            }
            else{
                declareWinner.textContent = "This is a draw";
            }
        }
    });
}
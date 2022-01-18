window.onload = () => {

    // Button
    const playButton = document.querySelector('.play-game-button');
    const buttonChoice = document.querySelectorAll('.choice');

    // Scores and round/game decision text
    const roundDecision = document.querySelector('.round-decision');
    const gameDecision = document.querySelector('.game-decision')
    const userScoreDiv = document.querySelector('.user-scores');
    const computerScoreDiv = document.querySelector('.computer-scores');

    let userNameScore = document.createElement('span');
    let computerNameScore = document.createElement('span');
    
    // Extra doms
    const rockTitle = document.querySelector('.title-rock');
    const paperTitle = document.querySelector('.title-paper');
    const scissorsTitle = document.querySelector('.title-scissors');
    const allTitles = document.querySelectorAll('.title');

    // Game Data
    let gameData = {
        userName: '',
        userScore: 0,
        computerScore: 0
    }

// initially change title color
changeTitleColor();

// Change title colors every seconds
let intervalId = setInterval(changeTitleColor, 1000);

// Change title colors for every call
function changeTitleColor() {
    if (rockTitle.style.color === 'green' || rockTitle.style.color === 'white') {
        rockTitle.style.color = 'red';
        paperTitle.style.color = 'green';
        scissorsTitle.style.color = 'blue';
        
    }
    else if (rockTitle.style.color === 'red') {
        rockTitle.style.color = 'blue';
        paperTitle.style.color = 'red';
        scissorsTitle.style.color = 'green';
    }
    else {
        rockTitle.style.color = 'green';
        paperTitle.style.color = 'blue';
        scissorsTitle.style.color = 'red';
    }
}

addEventListener

playButton.addEventListener('click', gameInit);

// Function that starts and reset's the game
function gameInit() {
    gameDecision.textContent = '';
    roundDecision.textContent = '';
    
    gameData.userScore = 0;
    gameData.computerScore = 0;
    gameData.userName = prompt('Enter your user name', 'User'); 
    gameData.userName = !gameData.userName ? 'User' : gameData.userName;
    userNameScore.textContent = `${gameData.userName}: ${gameData.userScore}`;
    computerNameScore.textContent = `Computer: ${gameData.computerScore}`;
    
    userScoreDiv.appendChild(userNameScore);
    computerScoreDiv.appendChild(computerNameScore);
    
    clearInterval(intervalId);
    allTitles.forEach(i => i.style.color = 'white');

    playButton.style.display = 'none';
    
        buttonChoice.forEach(i => i.style.display = 'flex');
        buttonChoice.forEach(i => i.removeEventListener('click', playRound));
    
        buttonChoice.forEach(i => i.addEventListener('click', playRound));
    }

    function generateComputerChoice () {
        let generateRandom = Math.floor(Math.random() * 3);
        return (generateRandom === 0 ? 'ROCK' : generateRandom === 1 ? 'PAPER' : 'SCISSORS');
    }

    // Function that plays a single round and returns the winner
    function playRound () {
        let status = '';
        let userChoice = this.value;
        let computerChoice = generateComputerChoice();
    
        if (userChoice === computerChoice)
        {
            status = 'Tied';
        }
        else if ((userChoice === 'ROCK' && computerChoice === 'SCISSORS') || 
        (userChoice === 'PAPER' && computerChoice === 'ROCK') ||
        (userChoice === 'SCISSORS' && computerChoice === 'PAPER'))
        {
            status = 'Won';   
        }
        else
        {
            status = 'Lost';
        }
        console.log (`${userChoice} ${computerChoice}`);
        gameResult(`You chose ${userChoice.toLowerCase()}, computer chose ${computerChoice.toLowerCase()},\nYou ${status}`);
    }

    // Function that controls the game

    function gameResult(result) {
    
        // Set Data 
        roundDecision.textContent = result;
        if (result.includes('Won'))
        {
            userNameScore.textContent = `${gameData.userName}: ${++gameData.userScore}`;
            userScoreDiv.appendChild(userNameScore);
        }
        else if (result.includes('Lost'))
        {
            computerNameScore.textContent = `Computer: ${++gameData.computerScore}`;
            computerScoreDiv.appendChild(computerNameScore);
        }

        if (gameData.userScore === 5 || gameData.computerScore === 5)
        {
            buttonChoice.forEach(i => i.style.display = 'none');
            playButton.style.display = 'flex';
            gameDecision.textContent = `Game end!! You ${gameData.userScore > gameData.computerScore ? 'Won' : 'Lost'}.\nPlay again?`
            if (gameDecision.textContent.includes('Won'))
            {
                changeTitleColor();
                intervalId = setInterval(changeTitleColor, 1000);

            }
            else {
                allTitles.forEach(i => i.style.color = 'grey');
            }
        } 
    }
}
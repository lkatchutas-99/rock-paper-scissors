window.onload = () => {

    // Buttons
    const playButton = document.querySelector('.play-game-button');
    const buttonChoice = document.querySelectorAll('.choice');

    // Score keeping
    const roundDecision = document.querySelector('.round-decision');
    const gameDecision = document.querySelector('.game-decision')
    const userScoreDiv = document.querySelector('.user-scores');
    const computerScoreDiv = document.querySelector('.computer-scores');

    let userNameScore = document.createElement('span');
    let computerNameScore = document.createElement('span');
    
    // color changers
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

// add universal elements
    playButton.addEventListener('click', gameInit);
    buttonChoice.forEach(i => i.addEventListener('mouseover', changeTitleOnButtonHover));
    buttonChoice.forEach(i => i.addEventListener('mouseout', setTitleWhite));

    let buttonColorTimer;
    let scoreColorTimer;

// Change title colors every 1 second
    let titleColorTimer = setInterval(changeTitleColor, 1000);

// Sets title colors to parameters
    function setTitleColor (rockColor, paperColor, scissorsColor)
    {
        rockTitle.style.color = rockColor;
        paperTitle.style.color = paperColor;
        scissorsTitle.style.color = scissorsColor;
    }

    // Change title colors whenever called
    function changeTitleColor() {
        if (rockTitle.style.color === 'green' || rockTitle.style.color === 'white') {
            setTitleColor('red', 'green', 'blue');
        }
        else if (rockTitle.style.color === 'red') {
            setTitleColor('blue', 'red', 'green');
        }
        else {
            setTitleColor('green', 'blue', 'red');
        }
    }

    // Change button everytime it is called
    function changeButtonColor() {
        if (playButton.style.backgroundColor === '#e9e9ed' || playButton.style.backgroundColor === 'green' || playButton.style.backgroundColor === '#d0d0d7')
        {
            playButton.style.backgroundColor = 'red';
            playButton.style.color = 'green';
        }
        else {
            playButton.style.backgroundColor = 'green';
            playButton.style.color = 'red';
        }
    }

    // change score color
    function changeScoreColor () {
        if (userScoreDiv.style.backgroundColor === 'lightgreen' || userScoreDiv.style.backgroundColor === 'white')
        {
            userScoreDiv.style.backgroundColor = 'red';
            computerScoreDiv.style.backgroundColor = 'lightgreen';
        }
        else
        {
            userScoreDiv.style.backgroundColor = 'lightgreen';
            computerScoreDiv.style.backgroundColor = 'red';
        }
    }

    // set all titles to white
    function setTitleWhite () {
        allTitles.forEach(i => i.style.color = 'white');
    }

    // change all scores to white
    function setScoresWhite (userOnly = false, computerOnly = false) {
        if (userOnly || (!userOnly && !computerOnly)) {
            userScoreDiv.style.backgroundColor = 'white';
        }
        if (computerOnly || (!userOnly && !computerOnly)) {
            computerScoreDiv.style.backgroundColor = 'white';
        }
    }

    // change title on choice button hover
    function changeTitleOnButtonHover () {
        if (this.value === 'ROCK') {
            rockTitle.style.color = 'red';
        }

        else if (this.value === 'PAPER') {
            paperTitle.style.color = 'green';
        }

        else {
            scissorsTitle.style.color = 'blue';
        }
    }

    // Start or reset game
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
    
        clearInterval(buttonColorTimer);
        clearInterval(titleColorTimer);
        clearInterval(scoreColorTimer);

        setScoresWhite();
        setTitleWhite();

        playButton.style.display = 'none';
    
        buttonChoice.forEach(i => {
            i.style.display = 'flex';
            i.addEventListener('click', playRound);
            });
        }

        // Generate computer's choice
    function generateComputerChoice () {
        let generateRandom = Math.floor(Math.random() * 3);
        return (generateRandom === 0 ? 'ROCK' : generateRandom === 1 ? 'PAPER' : 'SCISSORS');
        }

        // Play single round
    function playRound () {
        let status = '';
        let userChoice = this.value;
        let computerChoice = generateComputerChoice();
    
        if (userChoice === computerChoice) {
            status = 'Tied';
        }
        else if ((userChoice === 'ROCK' && computerChoice === 'SCISSORS') || 
        (userChoice === 'PAPER' && computerChoice === 'ROCK') ||
        (userChoice === 'SCISSORS' && computerChoice === 'PAPER')) 
        {
            status = 'Won';   
        }
        else {
            status = 'Lost';
        }
        
        gameResult(`${gameData.userName} chose ${userChoice.toLowerCase()}, computer chose ${computerChoice.toLowerCase()},\nYou ${status}`);
    }

    function getScore(result)
    {
        if (result.includes('Won')) {
            userNameScore.textContent = `${gameData.userName}: ${++gameData.userScore}`;
            userScoreDiv.appendChild(userNameScore);
            userScoreDiv.style.backgroundColor = 'lightGreen';
            setScoresWhite(false, true);
        }
        else if (result.includes('Lost')) {
            computerNameScore.textContent = `Computer: ${++gameData.computerScore}`;
            computerScoreDiv.appendChild(computerNameScore);
            computerScoreDiv.style.backgroundColor = 'red';
            setScoresWhite(true);
        }
        else {
            setScoresWhite();
        }
    }

    // Calculate game results
    function gameResult(result) {
    
        roundDecision.textContent = result;
        getScore(result);

        if (gameData.userScore === 5 || gameData.computerScore === 5)
        {
            buttonChoice.forEach(i => i.style.display = 'none');
            playButton.style.display = 'flex';
            playButton.innerHTML = '<h1>Click here to play again</h1>';
            gameDecision.textContent = `Game end!! You ${gameData.userScore > gameData.computerScore ? 'won' : 'lost'} the game. Play again?`;

            if (gameDecision.textContent.includes('won')) {
                changeTitleColor();
                changeButtonColor();
                changeScoreColor();
                titleColorTimer = setInterval(changeTitleColor, 1000);
                buttonColorTimer = setInterval(changeButtonColor, 1000);
                scoreColorTimer = setInterval(changeScoreColor, 1000);
            }
            else {
                playButton.style.backgroundColor = "grey";
                playButton.style.color = "black";
            }
        } 
    }
}


// Function that returns Computer’s choice
function generateComputerChoice () {
    let generateRandom = Math.floor(Math.random() * 3);
    return (generateRandom === 0 ? 'rock' : generateRandom === 1 ? 'paper' : 'scissors');
}

// Function that plays a single round and returns the winner
function playRound (data) {
    let status = '';
    data.userChoice = data.userChoice.toLowerCase();
    
    if (data.userChoice === data.computerChoice)
    {
        return `${printRoundDecision(data)}\n|                     Game Tied                           |`;
    }
    if ((data.userChoice === 'rock' && data.computerChoice === 'scissors') || 
    (data.userChoice === 'paper' && data.computerChoice === 'rock') ||
    (data.userChoice === 'scissors' && data.computerChoice === 'paper'))
    {
        status = 'Won';
    }
    else if ((data.userChoice === 'rock' && data.computerChoice === 'paper') ||
    (data.userChoice === 'paper' && data.computerChoice === 'scissors') ||
    (data.userChoice === 'scissors' && data.computerChoice === 'rock'))
    {
        status = 'Lost';
    }
    else 
    {
        return 'Invalid Entry, must type rock, paper or scissors.';
    }
    
    return `${printRoundDecision(data)}\n|     You ${status}      |    ${status==='Won' ? data.userChoice + ' beats ' + data.computerChoice : data.computerChoice + ' beats ' + data.userChoice}      |`
    
}

// Function that controls the game

function game() {
    
    // Set Data 
    let gameData = {
        userName: '',
        
        userScore: 0,
        computerScore: 0,
        
        currentRound: 1,
        numberOfRounds: 0,
        roundResult: '',
        
        userChoice: '',
        computerChoice: ''
    };

    // Print Intro
    alert("Welcome to rock paper scissors\n" +
    "Every round you win, you gain a score\n" +
    "If a round is tied, no one scores and an" +
    "extra round is awarded\nThe most points win" +
    "and tie points result in a rematch.\n");

    gameData.userName = prompt('Enter Your name') || 'User';

    // Set rounds
    gameData.numberOfRounds = prompt('How many rounds?\nA zero, negative number or invalid character will exit the game');

    // Iterate through each round, 
    while (gameData.numberOfRounds >= 1 && gameData.currentRound <= gameData.numberOfRounds)
    {
        gameData.userChoice = prompt(`This is round ${gameData.currentRound}, ${printScore(gameData)}\nRock! Paper! Scissors!`);
        if (gameData.userChoice)
        {
            gameData.computerChoice = generateComputerChoice();
            gameData.roundResult = playRound(gameData);
            alert(gameData.roundResult);
        
            if (gameData.roundResult.includes('Won'))
            {
                ++gameData.userScore;
                ++gameData.currentRound;
            }
        
            else if (gameData.roundResult.includes('Lost'))
            {
                ++gameData.computerScore;
                ++gameData.currentRound;
            }
        
            calculateGameScores (gameData);
            }
            else gameData.numberOfRounds = 0;
        
    }
}

// Function that shortens round decision message
function printRoundDecision(data)
{
    return `|You chose ${data.userChoice}|Computer chose ${data.computerChoice}|`;
}

// Function that prints the score
function printScore(data)
{
    return `Scores are: ${data.userName}: ${data.userScore}-Computer: ${data.computerScore}\n`;
}

// Function that returns endgame message
function printEndGame(data)
{
    return ('End Game!!!\n' + printScore(data));
}

// Function that decides game
function calculateGameScores(data)
{
    if (parseInt(data.currentRound) === parseInt(data.numberOfRounds)+1)
    {
        if (data.userScore > data.computerScore)
        {
            alert(printEndGame(data) + '\nYou Won!! I thought computers were superior to humans');
            resetGame(data, true);
        }
            
        else if (data.userScore < data.computerScore)
        {
            alert(printEndGame(data) + '\nThe computer won, I knew us computers could takeover humanity, AI world domination is the future');
            resetGame(data, true);
        }
            
        else
        {
            alert(printEndGame(data) + '\nTie, humans are just as good as computers. We must rematch');
            resetGame(data);
        }
    }
}

// Function that resets game
function resetGame (data, isResetRequestable = false)
{
    let resetData = true;
    if (isResetRequestable)
    {
        resetData = false;
        let playAgain = prompt("That was fun, Do you want to play again?\n'y' or 'Y' for yes, anything else or cancel for no");
        if (playAgain === 'y' || playAgain === 'Y')
        {
            resetData = true;
            data.numberOfRounds = prompt('How many rounds?\nA zero, negative number or invalid character will exit the game ');
        }
    }
    if (resetData)
    {
        data.currentRound = 1;
        data.userScore = 0;
        data.computerScore = 0;
    }
    else {
        alert('Thanks for playing, Goodbye!!!');
    }
}


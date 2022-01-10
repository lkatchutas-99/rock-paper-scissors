// Function that prints the score
function printScore(user, computer)
{
    return `Scores are: User: ${user}-Computer: ${computer}\n`;
}

// Function that returns endgame message (user, computer)
function endGame(user, computer)
{
    return ('End Game!!!\n' + printScore(user, computer));
}

// Function that returns Computer’s choice

function computerChoice () {
    let generateRandom = Math.floor(Math.random() * 3);
    return 'scissors';//(generateRandom === 0 ? 'rock' : generateRandom === 1 ? 'paper' : 'scissors');
}

// Function that plays a single round and returns the winner (user’s Choice, computer’s choice)
function playRound (userChoice, computerChoice) {
    userChoice = userChoice.toLowerCase();

    // If user chooses rock
    if (userChoice === 'rock')
    {
        // If computer chooses rock, game tied
        if (computerChoice() === 'rock')
        {
            return '|You chose Rock|Computer chose Rock|\n|                          Tied                                    |';
        }

        // If computer chooses paper, user loses
        if (computerChoice() === 'paper')
        {
            return '|You chose Rock|Computer chose Paper|\n|       You Lost      |    Paper Beats Rock      |';
        }
        // If computer chooses scissors, user wins
        return '|You chose Rock|Computer chose Scissors|\n|       You Won     |      Rock Beats Scissors    |';
        
    }

    // If user chooses paper
    else if (userChoice === 'paper')
    {
        // If computer chooses rock, user wins
        if (computerChoice() === 'rock')
        {
            return '|You chose Paper|Computer chose Rock|\n|      You Won        |     Paper Beats Rock   |';
        }

        // If computer chooses paper, game tied
        if (computerChoice() === 'paper')
        {
            return '|You chose Paper|Computer chose Paper|\n|                           Game Tied                           |';
        }

        // If computer chooses scissors, user loses
        return '|You chose Paper|Computer chose Scissors|\n|        You Lost       |     Scissors beats Paper   |';
    }

    // If user chooses scissors
    else if (userChoice === 'scissors')
    {
        // If computer chooses rock, user loses
        if (computerChoice() === 'rock')
        {
            return '|You chose Scissors|Computer chose Rock|\n|        You Lost          |   Rock Beats Scissors  |';
        }

        // If computer chooses paper, user wins
        if (computerChoice() === 'paper')
        {
            return '|You chose Scissors|Computer chose Paper|\n|     You Won         |Scissors Beats Paper|';
        }
        
        // If computer chooses scissors, game tied
        return '|You chose Scissors|Computer chose Scissors|\n|                             Game Tied                                 |';
    }
    else 
    {
        return 'Invalid Entry, must type rock, paper or scissors.';
    }
}

// Function that controls the game

function game() {

    let currentRound = 1;
    let userScore = 0;
    let computerScore = 0;
    let roundResult = '';
    let userInput = '';
    let rounds = '';
    let intro = 'Welcome to rock paper scissors\n';
    intro += 'Every round you win, you gain a score\n';
    intro += 'If a round is tied, no one scores and an ';
    intro += 'extra round is awarded\nThe most points win ';
    intro += 'and tie points result in a rematch.\n'
    intro += 'Game will also end if the score gap is so great';
    intro += 'that it is impossible for the losing score to comeback and win';
    
    // Print Intro
    alert(intro);
    rounds = prompt('How many rounds?\nA zero or negative number will exit the game and the computer will automatically win');
    if (rounds >= 1) 
    {
        userInput = prompt(`Welcome, This is round 1, ${printScore(userScore, computerScore)}\nRock! Paper! Scissors!`);
    }

    // Iterate through each round, 
    while (currentRound >= 1 && currentRound <= rounds && userInput)
    {
        roundResult = playRound(userInput, computerChoice)
        alert(roundResult);
        
        if (roundResult.includes('Won'))
        {
            userScore++;
            currentRound++;
        }

        else if (roundResult.includes('Lost'))
        {
            computerScore++;
            currentRound++;
        }
        
        // Game decision
        // The second condition ends the game if it is impossible for the losing score to come back and win
        if (parseInt(currentRound) === parseInt(rounds)+1 || rounds - currentRound <= (userScore > computerScore ? userScore - computerScore : computerScore - userScore))
        {
            
            if (userScore > computerScore)
            {
                alert(endGame(userScore, computerScore) + '\nYou Won!! I thought computers were superior to humans');
            }

            else if (userScore < computerScore)
            {
                alert(endGame(userScore, computerScore) + '\nThe computer won, I knew us computers could takeover humanity, AI world domination is the future');
            }

            else if (userScore === computerScore)
            {
                alert(endGame(userScore, computerScore) + '\nTie, humans are just as good as computers. We must rematch');
                currentRound = 1;
                userScore = 0;
                computerScore = 0;
            }
            
            if (userScore != computerScore)
            {
                let playAgain = prompt("That was fun, Do you want to play again?\n'y' or 'Y' for yes, anything else or cancel for no");
                if (playAgain === 'y' || playAgain === 'Y')
                {
                    currentRound = 1;
                    userScore = 0;
                    computerScore = 0;
                    rounds = prompt('How many rounds?\nA zero or negative number will exit the game and the computer will automatically win');
                }
                else
                {
                    currentRound += rounds;
                }
            }
        }
        
        if (currentRound <= rounds) 
        {
            userInput = prompt(`This is round ${currentRound}, ${printScore(userScore, computerScore)}\nRock! Paper! Scissors!`);
        }
    }

    if (!userInput)
    {
        alert('The coward human decided to bail, computer wins');
    }
}


/*
Challenges:

1) A player looses his ENTIRE score when he rolls two 6 in a row. After thath, it's 
    the next player's turn. (Hint: Always save the previous dice roll in a separate variable).

2)  Add an input field to the HTML where players can set the winning score, so that they can change the
    predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This
    is a good oportunity to use google to figure this out)

3) Add another dice to the game so that there are two dices now. The player looses his current score
   when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look
    at the CSS code for the first one.)

*/

var scores, roundScore, activePlayer, gamePlaying, previous;

init();

// When the button Roll is clicked
document.querySelector('.btn.btn--roll').addEventListener('click', function(){
    if (gamePlaying){
        // 1) Random number
        var dice = Math.floor(Math.random() * 6 ) + 1;
        var dice2 = Math.floor(Math.random() * 6 ) + 1;


        // 2) Display the image of the dice
        document.getElementById("dice-1").style.display = 'block';
        document.getElementById("dice-2").style.display = 'block';
        document.getElementById("dice-1").src = 'dice-' + dice + '.png';
        document.getElementById("dice-2").src = 'dice-' + dice2 + '.png';

        // 3) Update the round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice2 !== 1)
        {
            // add score
            roundScore += dice + dice2;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }
        else
        {
            // Next Player
            nextPlayer();
        }

        /* // Challenge 1
        if(previous == 6 && dice == 6)
        {
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector('#score--' + activePlayer).textContent = 0;
            nextPlayer();
        }
        // 3) Update the round score IF the rolled number was NOT a 1
        else if (dice !== 1)
        {
            // add score
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }
        else
        {
            // Next Player
            nextPlayer();
        }

        previous = dice;
        */
    }
});

// When the user click hold
document.querySelector('.btn.btn--hold').addEventListener('click', function(){
    if(gamePlaying){
        // Save the score to the correct player, by storing in it in our array
        scores[activePlayer] += roundScore;

        // display that score
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if(input){
            winningScore = input;
        }else{
            winningScore = 20;
        }

        // Check if player won
        if(scores[activePlayer] >= winningScore){
            document.querySelector("#name--" + activePlayer).textContent = 'Winner!!!';
            document.getElementById("dice-1").style.display = 'none';
            document.getElementById("dice-2").style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add("player--winner");
            document.querySelector('.player--' + activePlayer).classList.remove("player--active");
            gamePlaying = false;
        }
        else
        {
            // Next Player
            nextPlayer();
        }
    }
});

// new game
document.querySelector(".btn.btn--new").addEventListener('click', init);

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player.player--0').classList.toggle("player--active");
    document.querySelector('.player.player--1').classList.toggle("player--active");

    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';
}

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 first player and 1 second player
    gamePlaying = true;

    // change the style of an element, Example: hiding the image
    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';

    // Set the scores to 0
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    document.getElementById("name--0").textContent = 'Player 1';
    document.getElementById("name--1").textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove("player--winner");
    document.querySelector('.player--0').classList.remove("player--active");
    document.querySelector('.player--0').classList.add("player--active");

    document.querySelector('.player--1').classList.remove("player--winner");
    document.querySelector('.player--1').classList.remove("player--active");
}
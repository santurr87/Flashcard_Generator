//requiring other files in this folder + the inquirer npm
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
//variable to keep count and a score
var count = 0;
var score = 0;
var cardType;
//beginning game/function
var begin = function() {
	// checks to see which type of card the user wants to use
    if (process.argv[2] === "basic") {
        cardType = cardData.data.basic;
    } else if (process.argv[2] === "cloze") {
        cardType = cardData.data.cloze;
    }
    reviewCards(cardType, count);
};

var reviewCards = function() {
	// run following code only four times
    if (count < 4) {
        if (cardType == cardData.data.basic) {
        	// create a new basic card
            var newBasicCard = new BasicCard(cardType[count].question, cardType[count].answer);
            // prompt user with the question from the front of the card
            inquirer.prompt([{
                "type": "input",
                "name": "question",
                "message": newBasicCard.front
                // check user answer and provide feedback -- increment score if user is right
            }]).then(function(user) {
                if (user.question === newBasicCard.back) {
                    console.log("Good Job!");
                    score++;
                } else {
                    console.log("Nope.. The answer was " + cardType[count].answer);
                }
                // increments count variable so that next question will be displayed upon running the function again
                count++;
                reviewCards();
            });
        } else if (cardType == cardData.data.cloze) {
        	// make a new cloze card using imported constructor and information from JSON file
            var newClozeCard = new ClozeCard(cardType[count].text, cardType[count].cloze);
            // run function associated with imported construction to form the cloze-deleted text that will be displayed to the user
            newClozeCard.makePartial();
            // prompts user with partial text 
            inquirer.prompt([{
                "type": "input",
                "name": "question",
                "message": newClozeCard.partial
            }]).then(function(user) {
                if (user.question === newClozeCard.cloze) {
                    console.log("Good Job!");
                    score++;
                } else {
                    console.log("Nope.. The answer was " + cardType[count].answer);
                }
                count++;
                reviewCards();
            });
        }
    } else {
    	// display user score and prompt if user wants to play again
        console.log("You got " + score + " questions correct out of 4.");
        inquirer.prompt([{
            "type": "confirm",
            "name": "tryAgain",
            "message": "Would you like to try again?"
        }]).then(function(answer) {
            if (answer.tryAgain) {
            	count = 0;
            	score = 0;
                reviewCards(count);
            }
        });
    }
};

begin();
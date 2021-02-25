
    //                          [lesson12F.js]   

//      {CARD GAME} Deals five hands of cards, declares winner, 
//      and displays winning point difference through many functions.

//      Similar to 12B but this one plays pseudo blackjack

let cl = console.log
let ct = console.table

let trouble = 0

var overlay = document.getElementById("overlay")




let create = function(suit, rank) {

    let name = rank

    if (name === 11) {
        name = "Jack";
    } else if (name === 12) {
        name = "Queen";
    } else if (name === 13) {
        name = "King";
    } else if (name === 14) {
        name = "Ace";
    };

    switch (suit) {
        
        case 1:
        suit = "Clubs";
        break;

        case 2:
        suit = "Diamonds";
        break;

        case 3:
        suit = "Hearts";
        break;
        
        case 4:
        suit = "Spades";
        break;
    };

    switch (suit) {
        
        case "Clubs":
        cardColor = "black";
        break;

        case "Spades":
        cardColor = "black";
        break;

        case "Hearts":
        cardColor = "red";
        break;

        case "Diamonds":
        cardColor = "red";
        break;
    };

    if (name === "Ace") {
        rank = 11;
    } else if (name === "Jack") {
        rank = 10;
    } else if (name === "Queen") {
        rank = 10;
    } else if (name === "King") {
        rank = 10;
    };


    let card = {

        rank: rank,
        suit: suit,
        cardColor: cardColor,
        name: name,

            
        
    };

    return card;
}

let newDeck = function() {

    let deck = [];

    for (let newSuit = 1; newSuit < 5; newSuit++) {

        for (let newRank = 2; newRank < 15; newRank++) {

            deck.push(create(newSuit, newRank));
        
        };
    };

    return deck

};

let deck = newDeck();

let getHand = function(cardCount) {

    let hand = [];

    for (let i = 0; i < cardCount; i++) {

        rng = Math.floor(Math.random()*deck.length);
               
        hand.push(deck[rng]);
        deck.splice (rng, 1);

        
    };

    return hand
    
};



let dealerHand = getHand(2);

let hand1 = getHand(2);
let hand2 = getHand(2);

let players = [hand1, hand2];


let showHand = function(playerHand) {

    renderHand(playerHand, "visualCards");
    score1(players[0], "phandcount")
    

    document.getElementById("playerCards").innerText = " "
    document.getElementById("playerAddedCards").innerText = ""

    for (let i = 0; i < 2; i++) {

        document.getElementById("playerCards").innerText += 
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")

        cl
        (playerHand[i].name + " of " + playerHand[i].suit+ "\n")

    }

    for (let i = 2; i < playerHand.length; i++) {

        document.getElementById("playerAddedCards").innerText += 
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")

        cl
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")

    }



    return " "

};

let showDealer = function(playerHand) {

    renderHiddenHand(playerHand, "visualDealerCards")
    score2(dealerHand, "dealerhandcount")

    document.getElementById("dealercards").innerText = ""
    document.getElementById("dealeraddedcards").innerText = ""


    document.getElementById("dealercards").innerText +=
    ("hidden card"+ "\n")

    cl
    (playerHand[0].name + " of " + playerHand[0].suit + "\n")



    document.getElementById("dealercards").innerText +=
    (playerHand[1].name + " of " + playerHand[1].suit + "\n")

    cl
    (playerHand[1].name + " of " + playerHand[1].suit + "\n")



    for (let i = 2; i < playerHand; i++) {

        document.getElementById("dealeraddedcards").innerText +=
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")

        cl
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")
    }


    return " "

};

let revealDealer = function(playerHand) {

    renderHand(playerHand, "visualDealerCards");

    score1(dealerHand, "dealerhandcount")

    document.getElementById("dealercards").innerText = ""
    document.getElementById("dealeraddedcards").innerText = ""

    for (let i = 0; i < 2; i++) {

        document.getElementById("dealercards").innerText += 
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")

        cl
        (playerHand[i].name + " of " + playerHand[i].suit+ "\n")


    }


    for (let i = 2; i < playerHand.length; i++) {

        document.getElementById("dealeraddedcards").innerText +=
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")

        cl
        (playerHand[i].name + " of " + playerHand[i].suit + "\n")
    }


    return " "

};

let handTotal = function(playerHand) {

    aceCount = 0
    handCount = 0

    //evaluate handCount (non-ace portion)

    for (let i = 0; i < playerHand.length; i++) {
        
        if (playerHand[i].name == "Ace") {

            aceCount++

        } else {handCount += playerHand[i].rank}

    }

    //evaluate aceCount

    if (aceCount > 0) {

        for (let i = 0; i <= aceCount; i++) {
            
            if ((handCount + aceCount) > 11) {
                
                handCount++

            } else {handCount += 11}

            aceCount -= 1
            
        }
    } 

    return handCount

};

let checkHand = function(playerHand) {

    condition = "none"; //vice let condition = "none";
	
	if (playerHand == players[0]) {
		
		if (handTotal(playerHand) == 21) {

        		condition = "win"

    		} else if (handTotal(playerHand) > 21) {

        		condition = "bust"

    		} else {

        		condition = "play"
    		}

	} else {
		if (handTotal(playerHand) < 17) {

        		condition = "play"

    		} else if (handTotal(playerHand) == 21) {

        		condition = "win"

    		} else if (handTotal(playerHand) > 21) {

        		condition = "bust"

    		} else {

        		condition = "stay"
    		}
	}
    
    

    return condition
};

let draw = function(playerHand) { 
    
    //one hand
    
    //while
    //if (checkHand(playerHand) == "play") {

        rng = Math.floor(Math.random()*deck.length);
               
        //cl("+ card " + deck[rng].name + " of " + deck[rng].suit + "\n" );
        playerHand.push(deck[rng]);
        deck.splice (rng, 1);
    
    //};

    return "return"

};


let score1 = function(playerHand, location) {

    // total = 0

    // for (let i = 0; i < playerHand.length; i++) {
        
    //     total += playerHand[i].rank
        
    // }

    total = handTotal(playerHand)

    document.getElementById(location).innerText = total

    return " "
};

let score2 = function(playerHand, location) {

    // total = 0

    // for (let i = 0; i < playerHand.length; i++) {
        
    //     total += playerHand[i].rank
        
    // }

    total = handTotal(playerHand)-playerHand[0].rank

    document.getElementById(location).innerText = total

    return " "
};

let winner = function(a, b) { 
    //if they stay... f(playerHand,dealerHand) 
    //only check if they stay


    if (a > b) {
        document.getElementById("narration").innerText = 
        "You won!";

        document.getElementById("overlay").style.opacity = 1;

        revealDealer(dealerHand);

        return "\n ☆☆ WINNER ~ PLAYER 1 ☆☆";  //ret 1 
    } 
    else if (b > a) {
        document.getElementById("narration").innerText = 
        "You lost!";

        return "\n ☆☆ WINNER ~ DEALER ☆☆"; //else return 0
    } 
    else {
        document.getElementById("narration").innerText = 
        "You are both trash lol";

        return "\n lol everyone trash";
    }
};

let round = 1

let moreToPlay = 1

let turn = 1





function disableBtn(btnName) {

    let x = document.getElementById(btnName)
    // let stay = document.getElementById("stay")

    x.disabled = true;
    x.className = "button gray"

    // stay.disabled = true;
    // stay.className = "button gray"
}





function winner2() {

    score1(players[0], "phandcount")
    score1(dealerHand, "dealerhandcount")

    if (checkHand(players[0]) != "win" && checkHand(players[0]) != "bust"
    &&  checkHand(dealerHand) != "win" && checkHand(dealerHand) != "bust") {
        document.getElementById("log").innerText += 
        (winner(handTotal(players[0]), handTotal(dealerHand)))
    }


    else if (checkHand(dealerHand) == "bust") {

        document.getElementById("log").innerText += 
        "\n ☆☆ WINNER ~ PLAYER 1 ☆☆";

        document.getElementById("narration").innerText = 
        "You won!";

        document.getElementById("overlay").style.opacity = 1;

        revealDealer(dealerHand);
    }


    else if (checkHand(dealerHand) == "win") {
        document.getElementById("log").innerText += 
        "\n ☆☆ WINNER ~ DEALER ☆☆";

        document.getElementById("narration").innerText = 
        "You lost!";
    }

    else if (checkHand(players[0]) == "bust") {
        document.getElementById("log").innerText += 
        "\n ☆☆ WINNER ~ DEALER ☆☆";

        document.getElementById("narration").innerText = 
        "You lost!";
    }

    
    else if (checkHand(players[0]) == "win") {
        document.getElementById("log").innerText += 
        "\n ☆☆ WINNER ~ PLAYER 1 ☆☆";

        document.getElementById("overlay").style.opacity = 1;

        revealDealer(dealerHand);

        document.getElementById("narration").innerText = 
        "You won!";
    }

    
}

dealerGo = 0;

let dealerPlay = function() {

    dealerGo = 1;

    disableBtn("draw")
    disableBtn("stay")

    if (moreToPlay == 0) {

        while(dealerGo == 1) {

        //turn
        // document.getElementById("turn").innerText = 
        // ("Dealer's turn")

        // document.getElementById("dealerstatus").innerText = 
        // "playing";

        //robot gameplay lol
        if(checkHand(dealerHand) == "play") {
        
            draw(dealerHand)

            //refresh hand
            revealDealer(dealerHand);
            
            //game log action
            document.getElementById("log").innerText += 
            ("\n" + "Dealer drew a card")

            //we needed a card, loop again
            dealerGo = 1;

        }

        if (checkHand(dealerHand) == "bust"){

            // document.getElementById("dealerstatus").innerText = 
            // "bust";

            dealerGo = 0;

            //game log action
            document.getElementById("log").innerText += 
            ("\n" + "Dealer bust")

            revealDealer(dealerHand);

            winner2()

        };

        if (checkHand(dealerHand) == "stay"){

            dealerGo = 0;
            
            //game log action
            document.getElementById("log").innerText += 
            ("\n" + "Dealer stayed")

            revealDealer(dealerHand);
            winner2()
        
        };

        }

    }; 
}



function dealersTurn() {

    disableBtn("draw")
    disableBtn("stay")
    revealDealer(dealerHand);

    // document.getElementById("turn").innerText = 
    // ("Dealer's turn");

    dealerPlay()

    playerCheck()


}






function playerCheck() {

    

    //check for bust-
    doWeBust = "no"
    //game log action
    //  document.getElementById("log").innerText += 
    //  ("\n" + "Round "+(round-1)+", doWeBust = " + doWeBust);
doWeBust = checkHand(players[0])
    //game log action
    //  document.getElementById("log").innerText += 
    //  ("\n" + "Round "+(round-1)+", doWeBust = " + doWeBust);

if (doWeBust == "bust") {

    disableBtn("draw")
    disableBtn("stay")

    //set player status to BUST             
    document.getElementById("narration").innerText = 
    "Bust!";

    //game log action
    document.getElementById("log").innerText += 
    ("\n" + "Player " + (1) + "  Bust");



    //dealer reveal

    // document.getElementById("turn").innerText = 
    // ("Reveal");

    document.getElementById("log").innerText += 
    ("\n Dealer reveals");
    
    revealDealer(dealerHand)


    moreToPlay = 0;



    winner2()
    
}

else if (checkHand(players[0]) == "win") {

    disableBtn("draw")
    disableBtn("stay")

    moreToPlay = 0;

    document.getElementById("narration").innerText = 
    "You win!";

    winner2()
}


}



function gameStarts() {
     

    disableBtn("start")

    //just checking that it works
     
    // document.getElementById("start").innerText=
    // "Clicked!";
 
     
 
    //reveal game
    document.getElementById("game").style.display = "block";
 
    // document.getElementById("playerstatus").innerText = 
    // "playing";
 
    //game log action
    document.getElementById("log").innerText += 
    "-- GAME STARTS --"
 
    showHand(players[0])
    showDealer(dealerHand)
}



function runGame() {

   gameStarts()

    for (let i = 0; i < players.length; i++) {

        moreToPlay == 1;

        while (moreToPlay == 1) { //becomes a function. then listener calls it when they click more to play

            //reset while loop
            moreToPlay = 0;
            // document.getElementById("round").innerText = 
            // ("ROUND" + round);
            // round++;

            //turn
            // document.getElementById("turn").innerText = 
            // ("Player" + (i+1) + "'s turn");


            playerCheck()

            //check if they can play otherwise skip turn
            if (checkHand(players[0]) == "play") {


            //player 1 plays
            document.getElementById("draw").addEventListener("click", function() {

            // document.getElementById("draw").innerText=
            // "Clicked!"; 

            draw(players[0]);

            //keep going cause we drew a card
            moreToPlay = 1; 

            //refresh hand
            showHand(players[0]);

            //game log action
            document.getElementById("log").innerText += 
            ("\n" + "Player " + (1) + " drew a card")


            playerCheck()



            });
            
            //player 1 stays
            document.getElementById("stay").addEventListener("click", function() {
                
                disableBtn("draw")
                disableBtn("stay")

                // document.getElementById("playerstatus").innerText = 
                // "stay";

                // document.getElementById("stay").innerText=
                // "Clicked!";

                //game log action
                document.getElementById("log").innerText += 
                ("\n" + "Player " + (1) + " stayed");



                moreToPlay = 0;

                //dealers turn
                dealersTurn()



                

            })

            


            }

            
        }
    }

    

    

}














getLetter = function(playerHand, index) {

    cardLetter = 0;

    if (playerHand[index].name == "Jack") {
        cardLetter = "J";
    } else if (playerHand[index].name == "Queen") {
        cardLetter = "Q";
    } else if (playerHand[index].name == "King") {
        cardLetter = "K";
    } else if (playerHand[index].name == "Ace") {
        cardLetter = "A";
    } else {
        cardLetter = playerHand[index].name;
    }

    return cardLetter

}

getSuit = function(playerHand, index) {

    cardSuit = 0;

    if (playerHand[index].suit == "Diamonds") {
        cardSuit = "♢";
    } else if (playerHand[index].suit == "Hearts") {
        cardSuit = "♡";
    } else if (playerHand[index].suit == "Clubs") {
        cardSuit = "♣";
    } else if (playerHand[index].suit == "Spades") {
        cardSuit = "♠";
    }

    return cardSuit
}




function renderHand(playerHand, location) {

    score1(playerHand, location)
    
    document.getElementById(location).innerText = "";

	for(let i = 0; i < playerHand.length; i++) {



		let card = document.createElement("div");

		let rank = document.createElement("div");
		let suit = document.createElement("div");
		card.className = "card";
		rank.className = "rank";
		suit.className = "suit " + playerHand[i].suit;

		rank.innerHTML = getLetter(playerHand, i);
		card.appendChild(rank);
		card.appendChild(suit);

		document.getElementById(location).appendChild(card);
    
	}
}




function renderHiddenHand(playerHand, location) {

    score2(playerHand, location)
    
    document.getElementById(location).innerText = "";

    for(let i = 0; i < playerHand.length; i++) {

		let card = document.createElement("div");

		let rank = document.createElement("div");
		let suit = document.createElement("div");
		card.className = "card";

        if (playerHand == dealerHand && i == 0) {

            //hide card
            card.className = "hidden";

        }
		rank.className = "rank";
		suit.className = "suit " + playerHand[i].suit;

		rank.innerHTML = getLetter(playerHand, i);
		card.appendChild(rank);
		card.appendChild(suit);

		document.getElementById(location).appendChild(card);

	}
	
}

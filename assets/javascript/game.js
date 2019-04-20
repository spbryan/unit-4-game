/**************************************************
 * Sean Bryan
 * 2019-04-13
 **************************************************/
$(document).ready(function () {
    // Global Variables
    var championAttack = 0;

    var lukeSkywalker = {
        name: "Luke Skywalker",
        image: "./assets/images/luke_attack.jpg",
        hitPoints: 140,
        attackDamage: 8,
        counterDamage: 20,
        isDefeated: false,
        defeatImage: "./assets/images/luke_defeat.jpg"
    };

    var darthVader = {
        name: "Darth Vader",
        image: "./assets/images/vader_attack.jpg",
        hitPoints: 150,
        attackDamage: 7,
        counterDamage: 20,
        isDefeated: false,
        defeatImage: "./assets/images/vader_defeat.jpg"
    };

    var hanSolo = {
        name: "Han Solo",
        image: "./assets/images/solo_attack.jpg",
        hitPoints: 120,
        attackDamage: 14,
        counterDamage: 15,
        isDefeated: false,
        defeatImage: "./assets/images/solo_defeat.jpg"
    };

    var bobaFett = {
        name: "Boba Fett",
        image: "./assets/images/boba_attack.jpg",
        hitPoints: 110,
        attackDamage: 20,
        counterDamage: 6,
        isDefeated: false,
        defeatImage: "./assets/images/boba_defeat.jpg"
    };

    var characterList = [];
    var opponentList = [];
    var playerIndex = -1;
    var opponentIndex = -1;
    var gameOver = false;

    console.log("Test");
    initializeGame();

    /**
     * On-Click function to select champion
     */
    $(".character").on("click", function () {
        if (playerIndex < 0) {
            //Move player to arena
            var id = $(this).attr("id");
            playerIndex = parseInt(id.charAt(id.length - 1)) - 1;
            displayChampion();

            //Put remaining characters on opponent list
            $("#header-value").text("Select an Opponent");
            $("#character-list").empty();
            buildOpponentList();
            displayScoreboard();
            displayCharacters(opponentList, "opponent");
        }
    })

    /**
     * On-Click funtion to select opponent
     */
    $(".opponent").on("click", function () {
        if (opponentIndex < 0) {
            if (!gameOver) {
                //Move opponent to arena
                var id = $(this).attr("id");
                opponentIndex = parseInt(id.charAt(id.length - 1)) - 1;
                displayOpponent();
                displayAttackButton();
                $("#header-value").empty();
                if (opponentList[opponentIndex].isDefeated) {
                    diplayHeader2("arena", "YOU ALREADY BEAT THIS OPPONENT.  GIVE 'EM A SMACK AND THEN SELECT SOMEONE WITH SOME FIGHT!");
                }
            }
        }
    })

    /**
     * Onclick funtion for Attack button.  Controls the main battle logic
     */
    $(document).on('click', '#attack-button', function () {
        debugger;
        var opponentDefeatedThisRound = false;
        var champion = characterList[playerIndex];
        var opponent = opponentList[opponentIndex];
        //Champion attacks opponent
        if (!opponent.isDefeated) {
            championAttack += champion.attackDamage;
        }

        if (opponent.hitPoints > 0) {
            opponent.hitPoints -= championAttack;
        }

        if (opponent.hitPoints <= 0) {
            if (opponent.hitPoints < 0) {
                opponentDefeatedThisRound = true;
            }
            opponent.hitPoints = 0;
            opponentDefeated(opponent);
            $("#attack").empty();
        }

        //Opponent Counter-attacks
        if (!opponent.isDefeated || opponentDefeatedThisRound) {
            champion.hitPoints -= opponent.counterDamage;
            if (champion.hitPoints <= 0) {
                if (opponentDefeatedThisRound) {
                    champion.hitPoints = 0; //tie-breaker goes to champion
                }
                else {
                    champion.hitPoints = 0;
                    championDefeated(champion);
                }
            }
        }

        $("#champion .card-text").text(champion.hitPoints);
        $("#opponent .card-text").text(opponent.hitPoints);
        displayAction(champion, opponent);

        if (champion.isDefeated) {
            gameOver = true;
            $("#character-header").empty();
            diplayHeader("arena", "Game Over!  You Lose!");
        }

        if (allOpponentsDefeated()) {
            gameOver = true;
            $("#character-header").empty();
            diplayHeader("arena", "Game Over!  You Win!");
        }
    });

    /**
     * Display the characters.  Append to passed class name 
     * based on position in array
     * @param characters 
     * @param className 
     */
    function displayCharacters(characters, className) {
        for (var i = 0; i < characters.length; i++) {
            var cardDiv = buildCharacterCard(characters[i]);
            cardDiv.appendTo("#" + className + "-" + (i + 1));
        }
    }

    /**
     * Display the champion in the arena
     */
    function displayChampion() {
        var cardDiv = buildCharacterCard(characterList[playerIndex]);
        var championDiv = $("<div>");
        championDiv.attr("class", "jumbotron light-side");
        $("#champion").append(championDiv);
        var championH2 = $("<h2>");
        championH2.text("CHAMPION");
        championH2.appendTo(".light-side");
        cardDiv.appendTo(".light-side");
    }

    /**
     * Display the opponent in the arena
     */
    function displayOpponent() {
        var cardDiv = buildCharacterCard(opponentList[opponentIndex]);
        var opponentDiv = $("<div>");
        opponentDiv.attr("class", "jumbotron dark-side");
        $("#opponent").append(opponentDiv);
        var opponentH2 = $("<h2>");
        opponentH2.text("OPPONENT");
        opponentH2.appendTo(".dark-side");
        cardDiv.appendTo(".dark-side");
    }

    /**
     * Update character to indicate they are a defeated opponent.
     * Ends round of fighting and resets selection
     * @param opponent 
     */
    function opponentDefeated(opponent) {
        opponent.isDefeated = true;
        $(".opponent").empty();
        $("#arena-header").empty();
        displayCharacters(opponentList, "opponent");
        $("#header-value").text("Select an Opponent");
        opponentIndex = -1;
    }

    /**
     * Update character to indicate a defeated champion.
     * @param champion 
     */
    function championDefeated(champion) {
        champion.isDefeated = true;
        $("#champion").empty();
        $("#arena-header").empty();
        displayChampion();
        $("#attack").empty();
    }

    /**
     * Create and display the attack button
     */
    function displayAttackButton() {
        var attackButton = $("<button>");
        attackButton.attr("type", "button");
        attackButton.attr("class", "btn btn-danger");
        attackButton.attr("id", "attack-button");
        attackButton.text("ATTACK");
        $("#attack").append(attackButton);
    }

    /**
     * Create and display the scoreboard that will record the battle action
     */
    function displayScoreboard() {
        var scrollBox = $("<div>");
        scrollBox.attr("class", "scroll-box neutral-side");
        $("#score-board").append(scrollBox);
    }

    /**
     * Update the scoreboard with the details of the battle action for the round
     * @param champion 
     * @param opponent 
     */
    function displayAction(champion, opponent) {
        var championAction =
            champion.name + " hits " +
            opponent.name + " for " +
            championAttack + " points";

        var opponentAction =
            opponent.name + " counters, hitting " +
            champion.name + " for " +
            opponent.counterDamage + " points";

        var newBr = $("<br>")
        $(".scroll-box").prepend(newBr);

        var opponentP = $("<p>");
        opponentP.attr("id", "opponent-attack");
        opponentP.text(opponentAction);
        $(".scroll-box").prepend(opponentP);

        var championP = $("<p>");
        championP.attr("id", "champion-attack");
        championP.text(championAction);
        $(".scroll-box").prepend(championP);
    }

    /**
     * Create and populate an h1 element to be appended to a passed id value
     * @param appendToId 
     * @param textValue 
     */
    function diplayHeader(appendToId, textValue) {
        var newH1 = $("<h1>");
        newH1.text(textValue);
        $("#" + appendToId + "-header").append(newH1);
    }

    /**
     * Create and populate an h2 element to be appended to a passed id value
     * @param appendToId 
     * @param textValue 
     */
    function diplayHeader2(appendToId, textValue) {
        var newH2 = $("<h2>");
        newH2.text(textValue);
        $("#" + appendToId + "-header").append(newH2);
    }

    /**
     * Create the list of opponents from the remaining characters
     */
    function buildOpponentList() {
        for (var i = 0; i < characterList.length; i++) {
            if (i !== playerIndex) {
                opponentList.push(characterList[i])
            }
        }
    }

    /**
     * Create and append the character card element
     * @param character 
     */
    function buildCharacterCard(character) {
        var cardDiv = $("<div/>", { class: "card" });
        var cardImage = "";
        if (!character.isDefeated) {
            cardImage = $("<img/>", { class: "card-img-top", src: character.image });
        }
        else {
            cardImage = $("<img/>", { class: "card-img-top", src: character.defeatImage });
        }
        var cardBody = $("<div/>", { class: "card-body" });
        var cardTitle = $("<p/>", { class: "card-title", text: character.name });
        var cardText = $("<p/>", { class: "card-text", text: "Hit Points: " + character.hitPoints });

        cardBody.append(cardTitle);
        cardBody.append(cardText);
        cardDiv.append(cardImage);
        cardDiv.append(cardBody);
        return cardDiv;
    }

    /**
     * Initialize the game
     */
    function initializeGame() {
        opponentList = [];
        characterList = [lukeSkywalker, hanSolo, bobaFett, darthVader];
        displayCharacters(characterList, "character");
    }

    /**
     * Check to determin if all opponents on the opponent list are defeated
     */
    function allOpponentsDefeated() {
        for (var i = 0; i < opponentList.length; i++) {
            if (opponentList[i].isDefeated === false) {
                return false;
            }
        }
        return true;
    }

});
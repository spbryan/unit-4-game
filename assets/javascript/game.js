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

    console.log("Test");
    initializeGame();

    $(".character").on("click", function () {
        if (playerIndex < 0) {
            //Move player to arena
            var id = $(this).attr("id");
            playerIndex = parseInt(id.charAt(id.length - 1)) - 1;
            displayChampion();

            //Put remaining characters on opponent list
            // $("#character-header").text("Select an Opponent");
            $("#header-value").text("Select an Opponent");
            $("#character-list").empty();
            buildOpponentList();
            // displayAttackButton();
            displayScoreboard();
            displayCharacters(opponentList, "opponent");
        }
    })

    // $("#opponent-list").on("click", ".opponent", function () {
    $(".opponent").on("click", function () {
        if (opponentIndex < 0) {
            //Move opponent to arena
            var id = $(this).attr("id");
            opponentIndex = parseInt(id.charAt(id.length - 1)) - 1;
            // debugger;
            // if (!opponentList[opponentIndex].isDefeated) {
            displayOpponent();
            displayAttackButton();
            $("#character-header").empty();
            if (!opponentList[opponentIndex].isDefeated) {
                diplayHeader("arena", "FIGHT!!!!");
            }
            else {
                diplayHeader("arena", "YOU ALREADY BEAT THIS GUY.  GIVE 'EM A SMACK AND THEN SELECT SOMEONE WITH SOME FIGHT!");
            }
        }
    })

    $(document).on('click', '#attack-button', function () {
        var champion = characterList[playerIndex];
        var opponent = opponentList[opponentIndex];
        //Champion attacks opponent
        if (!opponent.isDefeated) {
            championAttack += champion.attackDamage;
        }
        
        opponent.hitPoints -= championAttack;
        if (opponent.hitPoints <= 0) {
            opponent.hitPoints = 0;
            opponentDefeated(opponent);
            $("#attack").empty();
        }

        //Opponent Counter-attacks
        if (!opponent.isDefeated) {
            champion.hitPoints -= opponent.counterDamage;
            if (champion.hitPoints <= 0) {
                champion.hitPoints = 0;
                championDefeated(champion);
            }
        }

        $("#champion .card-text").text(champion.hitPoints);
        $("#opponent .card-text").text(opponent.hitPoints);
        displayAction(champion, opponent);

        if (champion.isDefeated) {
            $("#character-header").empty();
            diplayHeader("arena", "Game Over!  You Lose!");
        }

        if (allOpponentsDefeated()) {
            $("#character-header").empty();
            diplayHeader("arena", "Game Over!  You Win!");
        }
    });

    function displayCharacters(characters, className) {
        for (var i = 0; i < characters.length; i++) {
            var cardDiv = buildCharacterCard(characters[i]);
            cardDiv.appendTo("#" + className + "-" + (i + 1));
        }
    }

    function displayChampion() {
        var cardDiv = buildCharacterCard(characterList[playerIndex]);
        var championDiv = $("<div>");
        championDiv.attr("class", "jumbotron light-side");
        // championDiv.attr("class", "light-side");
        $("#champion").append(championDiv);
        var championH2 = $("<h2>");
        championH2.text("CHAMPION");
        championH2.appendTo(".light-side");
        cardDiv.appendTo(".light-side");
    }

    function displayOpponent() {
        var cardDiv = buildCharacterCard(opponentList[opponentIndex]);
        var opponentDiv = $("<div>");
        // opponentDiv.attr("class", "jumbotron dark-side");
        opponentDiv.attr("class", "jumbotron dark-side");
        $("#opponent").append(opponentDiv);
        var opponentH2 = $("<h2>");
        opponentH2.text("OPPONENT");
        opponentH2.appendTo(".dark-side");
        cardDiv.appendTo(".dark-side");
    }

    function opponentDefeated(opponent) {
        opponent.isDefeated = true;
        // $("#character-header").text("Select an Opponent");
        $("#header-value").text("Select an Opponent");
        $(".opponent").empty();
        $("#arena-header").empty();
        displayCharacters(opponentList, "opponent");
        opponentIndex = -1;
    }

    function championDefeated(champion) {
        champion.isDefeated = true;
        $("#champion").empty();
        $("#arena-header").empty();
        displayChampion();
        $("#attack").empty();
    }

    function displayAttackButton() {
        var attackButton = $("<button>");
        attackButton.attr("type", "button");
        attackButton.attr("class", "btn btn-danger");
        attackButton.attr("id", "attack-button");
        attackButton.text("ATTACK");
        $("#attack").append(attackButton);
    }

    function displayScoreboard() {
        var scrollBox = $("<div>");
        scrollBox.attr("class", "scroll-box neutral-side");
        $("#score-board").append(scrollBox);
    }

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

    function diplayHeader(appendToId, textValue) {
        var newH1 = $("<h1>");
        newH1.text(textValue);
        $("#" + appendToId + "-header").append(newH1);
    }

    function buildOpponentList() {
        for (var i = 0; i < characterList.length; i++) {
            if (i !== playerIndex) {
                opponentList.push(characterList[i])
            }
        }
    }

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

    function initializeGame() {
        opponentList = [];
        characterList = [lukeSkywalker, hanSolo, bobaFett, darthVader];
        displayCharacters(characterList, "character");
    }

    function allOpponentsDefeated() {
        for (var i = 0; i < opponentList.length; i++) {
            if (opponentList[i].isDefeated === false) {
                return false;
            }
        }
        return true;
    }

});
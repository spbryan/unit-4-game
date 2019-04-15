/**************************************************
 * Sean Bryan
 * 2019-04-13
 **************************************************/
$(document).ready(function () {
    // Global Variables
    var heroAttack = 0;

    var lukeSkywalker = {
        name: "Luke Skywalker",
        image: "./assets/images/luke_attack.jpg",
        hitPoints: 130,
        attackDamage: 10,
        counterDamage: 20,
        isDefeated: false,
        defeatImage: "./assets/images/luke_defeat.jpg"
    };

    var darthVader = {
        name: "Darth Vader",
        image: "./assets/images/vader_attack.jpg",
        hitPoints: 150,
        attackDamage: 15,
        counterDamage: 30,
        isDefeated: false,
        defeatImage: "./assets/images/vader_defeat.jpg"
    };

    var hanSolo = {
        name: "Han Solo",
        image: "./assets/images/solo_attack.jpg",
        hitPoints: 100,
        attackDamage: 7,
        counterDamage: 14,
        isDefeated: false,
        defeatImage: "./assets/images/solo_defeat.jpg"
    };

    var bobaFett = {
        name: "Boba Fett",
        image: "./assets/images/boba_attack.jpg",
        hitPoints: 110,
        attackDamage: 9,
        counterDamage: 18,
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
            $("#character-header").text("Select an Opponent");
            $("#character-list").empty();
            buildOpponentList();
            displayCharacters(opponentList, "opponent");
        }
    })

    $(".opponent").on("click", function () {
        if (opponentIndex < 0) {
            //Move opponent to arena
            var id = $(this).attr("id");
            opponentIndex = parseInt(id.charAt(id.length - 1)) - 1;
            displayOpponent();
            displayFightButton();
            $("#character-header").empty();
            diplayHeader("arena", "FIGHT!!!!");
        }
    })

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
        $("#champion").append(championDiv);
        var championH2 = $("<h2>");
        championH2.text("CHAMPION");
        championH2.appendTo(".light-side");
        cardDiv.appendTo(".light-side");
    }

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

    function displayFightButton () {
        var fightButton = $("<button>");
        fightButton.attr("type", "button");
        fightButton.attr("class", "btn btn-danger");
        fightButton.attr("id", "attack");
        fightButton.text("ATTACK");
        $("#fight-button").append(fightButton);
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
        var cardTitle = $("<h5/>", { class: "card-title", text: character.name });
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

    //onclick the character 
    //  1. move hero to the arena
    //  2. Change heading to indicate an oponent list
    //  3. Change border of oponenets to red

});
/**************************************************
 * Sean Bryan
 * 2019-04-13
 **************************************************/
$(document).ready(function () {
    // Global Variables
    var heroAttack = 0;
    var heroSelected = false;

    var lukeSkywalker = {
        name: "Luke Skywalker",
        image: "./assets/images/luke_attack.jpg",
        defeatImage: "./assets/images/luke_defeat.jpg",
        hitPoints: 130,
        attackDamage: 10,
        counterDamage: 20
    };

    var darthVader = {
        name: "Darth Vader",
        image: "./assets/images/vader_attack.jpg",
        defeatImage: "./assets/images/vader_defeat.jpg",
        hitPoints: 150,
        attackDamage: 15,
        counterDamage: 30
    };

    var hanSolo = {
        name: "Han Solo",
        image: "./assets/images/solo_attack.jpg",
        defeatImage: "./assets/images/solo_defeat.jpg",
        hitPoints: 100,
        attackDamage: 7,
        counterDamage: 14
    };

    var bobaFett = {
        name: "Boba Fett",
        image: "./assets/images/boba_attack.jpg",
        defeatImage: "./assets/images/boba_defeat.jpg",
        hitPoints: 110,
        attackDamage: 9,
        counterDamage: 18
    };

    var characterList = [lukeSkywalker, hanSolo, bobaFett, darthVader];

    console.log("Test");
    initializeGame();

    $(".character").on("click", function () {
        console.log($(this).attr("id"));
        if (!heroSelected) {
            var id = $(this).attr("id");
            var index = parseInt(id.charAt(id.length - 1));
            var cardDiv = buildCharacterCard(characterList[index - 1]);
            cardDiv.appendTo(".light-side");
            heroSelected = true;
        }

    })

    function initializeGame() {
        heroSelected = false;
        buildCharacterList(characterList, "character");
    }

    function buildCharacterList(characters, className) {
        for (var i = 0; i < characters.length; i++) {
            var cardDiv = buildCharacterCard(characters[i]);
            cardDiv.appendTo("#" + className + "-" + (i + 1));
        }
    }

    function buildCharacterCard(character) {
        var cardDiv = $("<div/>", { class: "card" });
        var cardImage = $("<img/>", { class: "card-img-top", src: character.image });
        var cardBody = $("<div/>", { class: "card-body" });
        var cardTitle = $("<h5/>", { class: "card-title", text: character.name });
        var cardText = $("<p/>", { class: "card-text", text: "Hit Points: " + character.hitPoints });

        cardBody.append(cardTitle);
        cardBody.append(cardText);
        cardDiv.append(cardImage);
        cardDiv.append(cardBody);
        return cardDiv;
    }

    //onclick the character 
    //  1. move hero to the arena
    //  2. Change heading to indicate an oponent list
    //  3. Change border of oponenets to red

});
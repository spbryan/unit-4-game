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

    function initializeGame() {
        buildCharacterList(characterList);
    }

    function buildCharacterList(characters) {
        for (var i = 0; i < characters.length; i++) {
            var cardDiv = $("<div/>", { class: "card" });
            var cardImage = $("<img/>", { class: "card-img-top", src: characters[i].image });
            var cardBody = $("<div/>", { class: "card-body" });
            var cardTitle = $("<h5/>", { class: "card-title", text: characters[i].name });
            var cardText = $("<p/>", { class: "card-text", text: "Hit Points: " + characters[i].hitPoints });

            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardDiv.append(cardImage);
            cardDiv.append(cardBody);
            cardDiv.appendTo("#character-" + (i + 1));
        }
    }

    //onclick the character 
    //  1. move hero to the arena
    //  2. Change heading to indicate an oponent list
    //  3. Change border of oponenets to red

});
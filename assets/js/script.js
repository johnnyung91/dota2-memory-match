//Global Variables start
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;

var cards = [
    "faceless",
    "faceless",
    "kunkka",
    "kunkka",
    "lich",
    "lich",
    "lifestealer",
    "lifestealer",
    "shadowfiend",
    "shadowfiend",
    "spiritbreaker",
    "spiritbreaker",
    "tiny",
    "tiny",
    "vengeful",
    "vengeful",
    "viper",
    "viper"
];
var gameCards = document.getElementById("game-cards");
var modal = document.querySelector(".modal-overlay");
var modalButton = document.querySelector(".modal-button");
var midasCorrect = document.getElementById('midasCorrect')
var headBonk = document.getElementById('headBonk')

//Global Variables end

//Event Handlers start

// document.addEventListener("DOMContentLoaded", initiateApp);
initiateApp();

gameCards.addEventListener("click", handleClick);
modalButton.addEventListener("click", resetGame);

function handleClick(event) {
    if (event.target.className.indexOf("card-back") === -1) {
        return;
    }
    var backOfCard = event.target;
    backOfCard.className += " hidden";

    if (!firstCardClicked) {
        firstCardClicked = event.target;
        var firstCardSibling = firstCardClicked.previousElementSibling;
        firstCardClasses = firstCardSibling.className;
    } else {
        secondCardClicked = event.target;
        var secondCardSibling = secondCardClicked.previousElementSibling;
        secondCardClasses = secondCardSibling.className;

        gameCards.removeEventListener("click", handleClick);

        if (firstCardClasses === secondCardClasses) {
            gameCards.addEventListener("click", handleClick);
            backToNull();
            correctSound();
            matches++;
            attempts++;
            displayStats();
            if (matches === maxMatches) {
                modal.classList.remove("hidden");
            }
        } else {
            wrongSound();
            setTimeout(notMatched, 750);
        }
    }
}

function notMatched() {
    firstCardClicked.classList.remove("hidden");
    secondCardClicked.classList.remove("hidden");
    gameCards.addEventListener("click", handleClick);
    backToNull();
    attempts++;
    displayStats();
}

function backToNull() {
    firstCardClicked = null;
    secondCardClicked = null;
}

function displayStats() {
    var gamesPlayedId = document.getElementById("gamesPlayed");
    gamesPlayedId.textContent = gamesPlayed;

    var attemptsId = document.getElementById("attempts");
    attemptsId.textContent = attempts;

    var accuracyId = document.getElementById("accuracy");
    accuracyId.textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
    var percent = (matches / attempts) * 100;
    var percentage = Math.round(percent * 100) / 100;
    if (percentage) {
        return percentage + "%";
    } else {
        return "0%";
    }
}

function resetGame() {
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    displayStats();
    resetCards();
    destroyChildren(gameCards);
    shuffle(cards);
    startGame(cards);
    modal.classList.add("hidden");
}

function resetCards() {
    var hiddenCards = document.querySelectorAll(".card-back");
    for (let i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove("hidden");
    }
}

//start of shuffle
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function startGame(cardArray) {
    for (let i = 0; i < cardArray.length; i++) {
        var cardFront = document.createElement("div");
        cardFront.classList.add("card-front", cardArray[i]);

        var cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "col-2");

        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);

        gameCards.appendChild(cardDiv);
    }
}

function destroyChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function initiateApp() {
    shuffle(cards);
    startGame(cards);
}

function correctSound() {
    midasCorrect.play();
}

function wrongSound() {
    headBonk.play();
}

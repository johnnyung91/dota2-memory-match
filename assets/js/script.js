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
    "kunkka",
    "lich",
    "lifestealer",
    "shadowfiend",
    "spiritbreaker",
    "tiny",
    "vengeful",
    "viper"
];
var gameCards = document.getElementById("game-cards");
var modal = document.querySelector(".modal-overlay");
var modalButton = document.querySelector(".modal-button");

var midasCorrect = new Audio()
midasCorrect.src = "./assets/audio/midas_correct.mp3"
midasCorrect.volume = 0.2

var headBonk = new Audio()
headBonk.src = "./assets/audio/headbonk.mp3"
headBonk.volume = 0.5

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
        firstCardClicked.parentElement.classList.add('flip');
        var firstCardSibling = firstCardClicked.previousElementSibling;
        firstCardClasses = firstCardSibling.className;
    } else {
        secondCardClicked = event.target;
        secondCardClicked.parentElement.classList.add('flip');
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
    firstCardClicked.parentElement.classList.remove('flip');
    secondCardClicked.classList.remove("hidden");
    secondCardClicked.parentElement.classList.remove('flip');
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
    shuffleStart(cards);
    modal.classList.add("hidden");
}

function resetCards() {
    var hiddenCards = document.querySelectorAll(".card-back");
    for (let i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove("hidden");
    }
}

//start of shuffleStart
function shuffleStart(array) {
    var doubledArray = array.concat(array)

    var currentIndex = doubledArray.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = doubledArray[currentIndex];
        doubledArray[currentIndex] = doubledArray[randomIndex];
        doubledArray[randomIndex] = temporaryValue;
    }
    startGame(doubledArray)
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
    shuffleStart(cards);
}

function correctSound() {
    midasCorrect.play();
}

function wrongSound() {
    setTimeout(() => headBonk.play(), 250)
}

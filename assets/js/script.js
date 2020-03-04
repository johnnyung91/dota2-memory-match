//Global Variables start
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;

//Global Variables end

var gameCards = document.getElementById("game-cards");
gameCards.addEventListener("click", handleClick);

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
            matches++;
            attempts++;
            displayStats();
            if (matches === maxMatches) {
                var modal = document.querySelector(".modal-overlay");
                modal.classList.remove("hidden");
            }
        } else {
            setTimeout(notMatched, 1500);
        }
    }
}

function notMatched() {
    firstCardClicked.classList.remove("hidden");
    secondCardClicked.classList.remove("hidden");
    gameCards.addEventListener("click", handleClick);
    backToNull();
    attempts++;
    displayStats()
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
    var percent = matches / attempts * 100;
    var percentage = Math.round(percent * 100) / 100
    return percentage + "%";
}

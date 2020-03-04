//Global Variables start
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var matches = 0;
var maxMatches = 9;

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
            console.log("matches variable", matches);
            if (matches === maxMatches) {
                var modal = document.querySelector(".modal-overlay");
                modal.classList.remove("hidden");
            }
        } else {
            setTimeout(function() {
                firstCardClicked.classList.remove("hidden");
                secondCardClicked.classList.remove("hidden");
                gameCards.addEventListener("click", handleClick);
                backToNull();
            }, 1500);
        }
    }
}

function backToNull() {
    firstCardClicked = null;
    secondCardClicked = null;
}

var gameCards = document.getElementById('game-cards')

gameCards.addEventListener('click', handleClick)

function handleClick(event) {
    if (event.target.className.indexOf("card-back") === -1) {
        return;
    }
    console.log(event)
    var backOfCard = event.target;
    backOfCard.className += ' hidden';
}

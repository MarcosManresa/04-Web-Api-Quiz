function highScorePrint(){
    // Gets scores from the local storage or sets the array empty
    var scorehigh = JSON.parse(window.localStorage.getItem("highscoring")) || [];

    //sorting of the high score in descending order
    scorehigh.sort(function(a,b){
        return b.score - a.score;
    });

    scorehigh.forEach(function(score){
        // creates list item tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " = " + score.score;

        //display the score on page
        var orderEl = document.getElementById("highscoring");
        orderEl.appendChild(liTag);
    });
}

function clearHighScoring(){
    window.localStorage.removeItem("highscoring");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighScoring

//function is ran when the page is done loading
highScorePrint();
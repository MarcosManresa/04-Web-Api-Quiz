function highScorePrint(){
    var scorehigh = JSON.parse(window.localStorage.getItem("highscoring")) || [];

    scorehigh.sort(function(a,b){
        return b.score - a.score;
    });

    scorehigh.forEach(function(score){
        // creates list item tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " = " + score.score;

        //displays on page
        var orderEl = document.getElementById("highscoring");
        orderEl.appendChild(liTag);
    });
}

function clearHighScoring(){
    window.localStorage.removeItem("highscoring");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighScoring

highScorePrint();
window.addEventListener("storage", () => { 

    if(localStorage.getItem("activePlayer") !== "null") {
        let activePlayer = JSON.parse(localStorage.getItem("activePlayer"))
        console.log(activePlayer)

        document.getElementById("name").innerHTML = activePlayer.name
        document.getElementById("1").innerHTML = activePlayer.firstScore
        document.getElementById("2").innerHTML = activePlayer.secondScore
        document.getElementById("3").innerHTML = activePlayer.thirdScore
        document.getElementById("4").innerHTML = activePlayer.fourthScore
        document.getElementById("5").innerHTML = activePlayer.fiftScore
        document.getElementById("6").innerHTML = activePlayer.sixtScore
        document.getElementById("7").innerHTML = activePlayer.seventhScore
        document.getElementById("total").innerHTML = activePlayer.totalTopFive
        document.getElementById("best").innerHTML = activePlayer.bestScore
        document.getElementById("pointsToLeader").innerHTML = activePlayer.pointsToLeader > 0 ? activePlayer.pointsToLeader : "Leader"
        document.getElementById("trickToLeader").innerHTML = activePlayer.pointsToLeader > 0 ? activePlayer.trickToLeader : activePlayer.pointsToSecond + "före tvåan"
        
        document.getElementById("pointsToSecond").innerHTML = activePlayer.pointsToSecond > 0 ? activePlayer.pointsToSecond : 0 
        document.getElementById("trickToSecond").innerHTML = activePlayer.pointsToSecond > 0 ? activePlayer.trickToSecond : 0 

    }

}
)
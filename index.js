const players = []

window.addEventListener("storage", () => { 

    if (Number(localStorage.getItem("numOfPlayers")) > 0 && document.getElementById("playerContainer").hasChildNodes() === false) {
        setup()
    }
    else if (document.getElementById("playerContainer").childNodes.length !== Number(localStorage.getItem("numOfPlayers"))){

        while (document.getElementById("playerContainer").firstChild) {
            document.getElementById("playerContainer").removeChild(document.getElementById("playerContainer").firstChild)
        }
        while (players.length) {
            players.pop();
          }
        setup()
    }

    updateView()

  });

function setup() {
    console.log("setup")
    localStorage.setItem("sortList", "totalTopFive")
    localStorage.setItem("activePlayer", null)


    let playerContainer = document.getElementById("playerContainer")

    for (i=1; i<= localStorage.getItem("numOfPlayers"); i++) {
        playerContainer.appendChild(makeDiv(i))
        
        players.push(getPlayers(i))
    }
}

function makeDiv(i) {
    let div = document.createElement("div")
    let name = document.createElement("div")
    let firstScore = document.createElement("div")
    let secondScore = document.createElement("div")
    let thirdScore = document.createElement("div")
    let fourthScore = document.createElement("div")
    let fiftScore = document.createElement("div")
    let sixtScore = document.createElement("div")
    let seventhScore = document.createElement("div")
    let totalTopFive = document.createElement("div")
    
    div.setAttribute("class", "player")
    div.setAttribute("id", "playerDiv" + i)

    name.setAttribute("class", "name")
    firstScore.setAttribute("class", "firstScore score")
    secondScore.setAttribute("class", "secondScore score")
    thirdScore.setAttribute("class", "thirdScore score")
    fourthScore.setAttribute("class", "fourthScore score")
    fiftScore.setAttribute("class", "fiftScore score")
    sixtScore.setAttribute("class", "sixtScore score")
    seventhScore.setAttribute("class", "seventhScore score")
    totalTopFive.setAttribute("class", "totalTopFive score")


    

    div.appendChild(name)
    /*div.appendChild(firstScore)
    div.appendChild(secondScore)
    div.appendChild(thirdScore)
    div.appendChild(fourthScore)
    div.appendChild(fiftScore)
    div.appendChild(sixtScore)
    div.appendChild(seventhScore)*/
    div.appendChild(totalTopFive)




    return div
}


function runAnimation(number) {
    let score = document.getElementById("points")
    document.getElementById("points").classList.remove("hidden")
    score.innerHTML = number
    score.classList.add("animate-549112")
    setTimeout(() => score.classList.remove("animate-549112"), 5000)
}

function updateView() {
    console.log(localStorage)

    if (players.length > 0) {
        for (i=1; i <= players.length; i++) {

            players[i-1] = updatePlayers(i)
            players[i-1].totalTopFive = getFiveBest(players[i-1]).reduce((a,b)=>Number(a)+Number(b))
            let best = getFiveBest(players[0])
            let worst = getFiveBest(players[i-1])
            players[i-1].worstScore = Number(worst[worst.length - 1])
            players[i-1].bestScore = Number(best)

        }
        
        for (i=1; i <= players.length; i++) {

            let leader = getNthPlayer(0)
            let second = getNthPlayer(1)
            let pointsToLeader = leader.totalTopFive - players[i-1].totalTopFive
            let pointsToSecond = second.totalTopFive - players[i-1].totalTopFive
            let trickToLeader = pointsToLeader + players[i-1].worstScore
            let trickToSecond = pointsToSecond + players[i-1].worstScore

            players[i-1].pointsToLeader = pointsToLeader.toFixed(1)
            players[i-1].pointsToSecond = pointsToSecond.toFixed(1)
            players[i-1].trickToLeader =  trickToLeader.toFixed(1)
            players[i-1].trickToSecond = trickToSecond.toFixed(1)


        }
     }
    
    console.log(players)

    if (localStorage.getItem("sortList") !== "ingenSortering") {
        
        players.sort(compare)
    }
    
    
    if (players) {
        for (i=1; i <= players.length; i++) {
            let playerDiv = document.getElementById("playerDiv" + i)
            let activeName = document.getElementById("activeName")
            let trickToLeader = document.getElementById("trickToLeader")
            let toPosition = document.getElementById("toPosition")

            playerDiv.children[0].innerHTML = players[i-1].name
            /*playerDiv.children[1].innerHTML = players[i-1].firstScore 
            playerDiv.children[2].innerHTML = players[i-1].secondScore
            playerDiv.children[3].innerHTML = players[i-1].thirdScore 
            playerDiv.children[4].innerHTML = players[i-1].fourthScore
            playerDiv.children[5].innerHTML = players[i-1].fiftScore 
            playerDiv.children[6].innerHTML = players[i-1].sixtScore 
            playerDiv.children[7].innerHTML = players[i-1].seventhScore */
            playerDiv.children[1].innerHTML = players[i-1].totalTopFive.toFixed(1)

            if (players[i-1].isActive === true) {

                activeName.innerHTML = players[i-1].name
                trickToLeader.innerHTML = players[i-1].trickToLeader
                
                document.getElementById("playerDiv" + i).classList.add("active")
                localStorage.setItem("activePlayer", JSON.stringify(players[i-1]))
            } else if (players[i-1].isActive !== true && document.getElementById("activeName").innerHTML === players[i-1].name) {
                activeName.innerHTML = ""
                trickToLeader.innerHTML = ""
                document.getElementById("points").classList.add("hidden")
                localStorage.setItem("animationNumber", null)
            } else {

                document.getElementById("playerDiv" + i).classList.remove("active")
                
            }
        }
    }

    let score = localStorage.getItem("score")
    let number = localStorage.getItem("animationNumber")
    if (score === "true") {
        
        runAnimation(number)
        localStorage.setItem("score", false)
    }

} 

function compare(a, b ) {
    let sortType = localStorage.getItem("sortList")
    
    if ( Number(a[sortType]) > Number(b[sortType]) ){
      return -1;
    }
    if ( Number(a[sortType]) < Number(b[sortType]) ){
      return 1;
    }
    return 0;
  }
  
function getPlayers(i){
    let player = JSON.parse(localStorage.getItem('player' + i))
    return player
}

function updatePlayers(i) {
    return JSON.parse(localStorage.getItem('player' + i))
}


function getFiveBest(player) {
    let orderedList = [];
    orderedList.push(player.firstScore, player.secondScore, player.thirdScore, player.fourthScore, player.fiftScore, player.sixtScore, player.seventhScore)
    orderedList.sort(function(a, b){return Number(b) - Number(a)})

    while (orderedList.length > 5) {
        orderedList.pop()
    }

    return orderedList
}

function getNthPlayer(N) {
    let nthPlayer = []
    nthPlayer.push(...players)
    nthPlayer.sort((a,b)=> {
        return Number(a.totalTopFive) - Number(b.totalTopFive)
    })
    return nthPlayer.reverse()[N]
}


//window.addEventListener('storage', () => updateView())


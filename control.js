localStorage.clear();

const numOfPlayers = prompt("Hur många spelare?", 2);

document.addEventListener("DOMContentLoaded", function(event) { 
    start()
    document.getElementById("myForm").requestSubmit()
    localStorage.setItem("numOfPlayers", Number(numOfPlayers))
  });

function handle(e) {
    console.log(e)
    for(i = 1; i <= numOfPlayers; i++) {
        localStorage.setItem("player" + i, JSON.stringify(createPlayer(e, i)))
    }
    if(document.getElementById("animate").value) {
        triggerAnimation()
    }
    console.log(localStorage)
}

function tryThis(e) {

    let input = document.getElementById("animate")
    if (!isNaN(e.path[0].value)) {
        input.value = e.path[0].value
    }
    else {
        input.value = null
    }
}



function createPlayer(e, i) {
    let player = {}
    let name = "name" + i
    let firstScore = "firstScore" + i
    let secondScore = "secondScore" + i
    let thirdScore = "thirdScore" + i
    let fourthScore = "fourthScore" + i
    let fiftScore = "fiftScore" + i
    let sixtScore = "sixtScore" + i
    let seventhScore = "seventhScore" + i

    player.id = i
    e.target[name].value        ? player.name = e.target[name].value : player.name = " ";
    e.target[firstScore].value  ? player.firstScore = e.target[firstScore].value : player.firstScore = 0
    e.target[secondScore].value ? player.secondScore = e.target[secondScore].value : player.secondScore = 0
    e.target[thirdScore].value  ? player.thirdScore = e.target[thirdScore].value : player.thirdScore = 0
    e.target[fourthScore].value ? player.fourthScore = e.target[fourthScore].value : player.fourthScore = 0
    e.target[fiftScore].value   ? player.fiftScore = e.target[fiftScore].value : player.fiftScore = 0
    e.target[sixtScore].value   ? player.sixtScore = e.target[sixtScore].value : player.sixtScore = 0
    e.target[seventhScore].value? player.seventhScore = e.target[seventhScore].value : player.seventhScore = 0


    player.meanScore =(Number(e.target[fiftScore].value) + 
                       Number(e.target[fourthScore].value) +
                       Number(e.target[thirdScore].value) +
                       Number(e.target[secondScore].value) +
                       Number(e.target[firstScore].value)) / 5

    player.isActive = selectPlayer(i-1)

    return player
}

function selectPlayer(id) {
    return document.getElementsByClassName("selectedPlayer")[id].checked
}

function submitMyForm() {
    document.getElementById("submit").click()
}


function triggerAnimation(){
    localStorage.setItem("animationNumber", document.getElementById("animate").value)
    localStorage.setItem("score", true)
    console.log("animating")
    setTimeout(() => {localStorage.setItem("score", false); console.log(localStorage)
    } , 1000)
}


function start() {
    let form = document.getElementById("myForm")
   
    for (i = 1; i <= numOfPlayers; i++) {
        form.insertBefore(createForm(i), document.getElementById("submit"))
    }
    
}

function toggleSort(sortering) {

    if (localStorage.getItem("sortList") !== sortering) {

        localStorage.setItem("sortList", sortering)
        document.getElementById(sortering).classList.add("active")
    } else {
    localStorage.setItem("sortList", "ingenSortering")
    document.getElementById(sortering).classList.remove("active")

    }
    console.log(localStorage)
}

function createForm(id) {
    let div = document.createElement("div")
    div.setAttribute("class", "player")
    div.setAttribute("id", id)

    let radio = document.createElement("input")
    radio.setAttribute("type", "checkbox")
    radio.setAttribute("class", "selectedPlayer")
    radio.setAttribute("id", id)
    radio.setAttribute("onchange", "javascript:submitMyForm();")


    let name = document.createElement("input")
    name.setAttribute("type", "text")
    name.setAttribute("name", "name" + id)
    name.setAttribute("placeholder", "Namn")

    let firstScore = document.createElement("input")
    firstScore.setAttribute("type", "text")
    firstScore.setAttribute("name", "firstScore" + id)
    firstScore.setAttribute("placeholder", "Första Åk")

    let secondScore = document.createElement("input")
    secondScore.setAttribute("type", "text")
    secondScore.setAttribute("name", "secondScore" + id)
    secondScore.setAttribute("placeholder", "Andra Åk")

    let thirdScore = document.createElement("input")
    thirdScore.setAttribute("type", "text")
    thirdScore.setAttribute("name", "thirdScore" + id)
    thirdScore.setAttribute("placeholder", "Trick 1")

    let fourthScore = document.createElement("input")
    fourthScore.setAttribute("type", "text")
    fourthScore.setAttribute("name", "fourthScore" + id)
    fourthScore.setAttribute("placeholder", "Trick 2")

    let fiftScore = document.createElement("input")
    fiftScore.setAttribute("type", "text")
    fiftScore.setAttribute("name", "fiftScore" + id)
    fiftScore.setAttribute("placeholder", "Trick 3")

    let sixtScore = document.createElement("input")
    sixtScore.setAttribute("type", "text")
    sixtScore.setAttribute("name", "sixtScore" + id)
    sixtScore.setAttribute("placeholder", "Trick 4")

    let seventhScore = document.createElement("input")
    seventhScore.setAttribute("type", "text")
    seventhScore.setAttribute("name", "seventhScore" + id)
    seventhScore.setAttribute("placeholder", "Trick 5")


    let brake = document.createElement("br")
    
    div.appendChild(radio)
    div.appendChild(name)
    div.appendChild(firstScore)
    div.appendChild(secondScore)
    div.appendChild(thirdScore)
    div.appendChild(fourthScore)
    div.appendChild(fiftScore)
    div.appendChild(sixtScore)
    div.appendChild(seventhScore)
    div.appendChild(brake)

    return div
    
}






    


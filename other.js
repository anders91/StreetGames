window.addEventListener("storage", () => { 
    if (localStorage.getItem("sortList")) {
        document.getElementById("h1").innerHTML = localStorage.getItem("sortList")
    }
})
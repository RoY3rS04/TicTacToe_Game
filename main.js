const items = document.querySelectorAll(".grid-item");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart");

let counter = 1;
const wins = [
    [1, 2, 3], [1, 5, 9], [1, 4, 7],
    [4, 5, 6], [2, 5, 8], [3, 5, 7],
    [7,8,9], [3,6,9]
];
const ids = [];
const xWins = [];
const oWins = [];

loadEvents();

function loadEvents() {
    items.forEach(div => {
        div.addEventListener("click", clickingEvent);
    })
}

function clickingEvent(e) {
    if (counter % 2 !== 0 && e.target.innerText === "") {
        e.target.innerText = "X";
        counter++;
    } else {
        if (e.target.innerText === "") {
            e.target.innerText = "O";
            counter++;
        }
    }

    const id = e.target.dataset.id;
    const obj = {
        [id]: e.target.innerText
    }


    ids.push(obj);

    ids.forEach(item => {
        if (item[id] === "X") {
            xWins.push(Object.keys(item).join(""));
        } else if (item[id] === "O") {
            oWins.push(Object.keys(item).join(""));
        }
    })

    wins.forEach((item) => {
        if (xWins.length >= 3 && (xWins.sort().join("").includes(item.join("")) || xWins.sort((a,b) => {
            return b - a;
        }).join("").includes(item.join("")))) {
            message.innerText = "Player 1 Wins";
            items.forEach(element => {element.removeEventListener("click", clickingEvent)})
        } else if (oWins.length >= 3 && (oWins.sort().join("").includes(item.join("")) || oWins.sort((a,b) => {
            return b - a;
        }).join("").includes(item.join("")))) {
            message.innerText = "Player 2 Wins";
            items.forEach(element => {element.removeEventListener("click", clickingEvent)})
        }
    })
}

restartButton.addEventListener("click", (e) => {
    items.forEach(item => {
        item.textContent = "";
    })

    xWins.splice(0, xWins.length);
    oWins.splice(0, oWins.length);
    ids.splice(0, ids.length);
    counter = 1;

    message.textContent = "";
    loadEvents();
})
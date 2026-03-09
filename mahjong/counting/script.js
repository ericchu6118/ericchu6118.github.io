const wind = document.getElementById("mahjongTable");
const players = document.getElementsByClassName("name");
const points = document.getElementsByClassName("point");
const inputs = document.getElementById("inputs");
const nameBtn = document.getElementById("nameBtn");
const changeWindBtn = document.getElementById("changeWindBtn")
const btns = document.getElementById("btns");
const clearBtn = document.getElementById("clearBtn");

let windNum = 0;
let roundNum = 0;
let initNum = 0;
let playerNames = ["", "", "", ""];
let pointsNum = [100, 100, 100, 100]; //In HTML order (3,2,4,1)

const directions = ["東", "南", "西", "北"]

function storeData(windNum, roundNum, initNum, playerNames, pointsNum) {
    localStorage.setItem("windNum", windNum);
    localStorage.setItem("roundNum", roundNum);
    localStorage.setItem("initNum", initNum);
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
    localStorage.setItem("pointsNum", JSON.stringify(pointsNum));
}

function clearTable () {
    localStorage.clear();
    windNum = 0;
    roundNum = 0;
    initNum = 0;
    playerNames = ["", "", "", ""];
    pointsNum = [100, 100, 100, 100];

    btns.style.display = "none";
    Array.from(points).map((i) => {i.style.display = "none"})
    inputs.style.display = "";
    nameBtn.style.display = "";
    changeWindBtn.style.display = "";
}

function renderTable () {
    storeData(windNum, roundNum, initNum, playerNames, pointsNum)

    wind.textContent = directions[windNum];
    for (let i = 0; i < 4; i++) {
        Array.from(players)[i].textContent = directions[[2, 1, 3, 0].map((i) => (i + roundNum) % 4)[i]] + " " + playerNames[[2, 1, 3, 0].map((i) => (i + roundNum) % 4)[i]];
    }

    btns.style.display = "";
    Array.from(points).map((i) => {i.style.display = ""})
    inputs.style.display = "none";
    nameBtn.style.display = "none";
    changeWindBtn.style.display = "none";
}

if(!localStorage.getItem("windNum")) {
    clearTable();
} else {
    windNum = parseInt(localStorage.getItem("windNum"));
    roundNum = parseInt(localStorage.getItem("roundNum"));
    initNum = parseInt(localStorage.getItem("initNum"));
    playerNames = JSON.parse(localStorage.getItem("playerNames"));
    pointsNum = JSON.parse(localStorage.getItem("pointsNum"));
    renderTable();
}

nameBtn.addEventListener("click", () => {
    playerNames = Array.from(inputs.getElementsByTagName("input")).map((input) => input.value);
    renderTable();
});

clearBtn.addEventListener("click", () => {
    clearTable();
});

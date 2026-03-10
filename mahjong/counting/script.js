const wind = document.getElementById("mahjongTable");
const directions = document.getElementsByClassName("directions");
const players = document.getElementsByClassName("name");
const points = document.getElementsByClassName("point");
const inputs = document.getElementById("inputs");
const nameBtn = document.getElementById("nameBtn");
const changeWindBtn = document.getElementById("changeWindBtn")
const btns = document.getElementById("btns");
const clearBtn = document.getElementById("clearBtn");
const eatBtn = document.getElementById("eatBtn");
const eatBtns = document.getElementById("eatBtns");
const selBtns = document.getElementsByClassName("selBtns");
const givenBtn = document.getElementById("givenBtn");
const gottenBtn = document.getElementById("gottenBtn");

let windNum = 0;
let roundNum = 0;
let initNum = 0;
let playerNames = ["", "", "", ""];
let pointsStarting = 1;
let pointsNum = [100, 100, 100, 100]; //In HTML order (3,2,4,1)

let given = false;
let givenFrom = 0;
let givenTo = 0;

const directionsName = ["東", "南", "西", "北"]
const pointsTable = [1, 2, 4, 8, 16, 24, 32, 48, 64, 96, 128].map((value) => {value * pointsStarting})

function storeData(windNum, roundNum, initNum, playerNames, pointsNum) {
    localStorage.setItem("windNum", windNum);
    localStorage.setItem("roundNum", roundNum);
    localStorage.setItem("initNum", initNum);
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
    localStorage.setItem("pointsNum", JSON.stringify(pointsNum));
}

function showSection (num) {
    switch (num) {
        case 0:
            inputs.style.display = "";
            nameBtn.style.display = "";
            changeWindBtn.style.display = "";
            btns.style.display = "none";
            Array.from(points).map((i) => i.style.display = "none")
            eatBtns.style.display = "none";
            break;
        case 1:
            inputs.style.display = "none";
            nameBtn.style.display = "none";
            changeWindBtn.style.display = "none";
            btns.style.display = "";
            Array.from(points).map((i) => i.style.display = "")
            eatBtns.style.display = "none";
            break;
        case 2:
            inputs.style.display = "none";
            nameBtn.style.display = "none";
            changeWindBtn.style.display = "none";
            btns.style.display = "none";
            Array.from(points).map((i) => i.style.display = "")
            eatBtns.style.display = "";
            break;
    }
}

function clearTable () {
    localStorage.clear();
    windNum = 0;
    roundNum = 0;
    initNum = 0;
    playerNames = ["", "", "", ""];
    pointsNum = [100, 100, 100, 100];
}

function renderTable () {
    storeData(windNum, roundNum, initNum, playerNames, pointsNum)

    wind.textContent = directionsName[windNum];
    for (let i = 0; i < 4; i++) {
        directions[i].textContent = directionsName[[2, 1, 3, 0].map((i) => (i + initNum + roundNum) % 4)[i]]
        players[i].textContent = playerNames[[2, 1, 3, 0].map((i) => (i + roundNum) % 4)[i]];
        document.getElementById("tableColumn").style.transform="translateX("+(players[2].offsetWidth/2-players[1].offsetWidth/2)+"px)"
    }
}

function changeTable () {
    roundNum = (roundNum + 1) % 4;
    if (!roundNum) {
        windNum += 1;
    }
}

if(!localStorage.getItem("windNum")) {
    clearTable();
    showSection(0);
    renderTable();
} else {
    windNum = parseInt(localStorage.getItem("windNum"));
    roundNum = parseInt(localStorage.getItem("roundNum"));
    initNum = parseInt(localStorage.getItem("initNum"));
    playerNames = JSON.parse(localStorage.getItem("playerNames"));
    pointsNum = JSON.parse(localStorage.getItem("pointsNum"));
    showSection(1);
    renderTable();
}

nameBtn.addEventListener("click", () => {
    playerNames = Array.from(inputs.getElementsByTagName("input")).map((input) => input.value);
    showSection(1);
    renderTable();
});

changeWindBtn.addEventListener("click", () => {
    initNum += 1;
    renderTable();
});

clearBtn.addEventListener("click", () => {
    clearTable();
    showSection(0);
    renderTable();
});

eatBtn.addEventListener("click", () => {
    showSection(2);
});

Array.from(selBtns).map((i) => {
    i.addEventListener("click", () => {
        i.classList.toggle("pri");
        i.classList.toggle("sec");
    });
});

givenBtn.addEventListener("click", () => {
    given = !given;
    gottenBtn.classList.toggle("pri");
    gottenBtn.classList.toggle("sec");
});

gottenBtn.addEventListener("click", () => {
    given = !given;
    givenBtn.classList.toggle("pri");
    givenBtn.classList.toggle("sec");
});
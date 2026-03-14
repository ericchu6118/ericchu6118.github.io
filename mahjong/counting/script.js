const wind = document.getElementById("mahjongTable");
const directions = document.getElementsByClassName("directions");
const players = document.getElementsByClassName("name");
const playersBox = document.getElementsByClassName("players")
const points = document.getElementsByClassName("point");
const pointChange = document.getElementsByClassName("pointChange");
const inputs = document.getElementById("inputs");
const nameBtn = document.getElementById("nameBtn");
const changeWindBtn = document.getElementById("changeWindBtn")
const btns = document.getElementById("btns");
const clearBtn = document.getElementById("clearBtn");
const eatBtns = document.getElementById("eatBtns");
const selBtns = document.getElementsByClassName("selBtns");
const givenBtn = document.getElementById("givenBtn");
const gottenBtn = document.getElementById("gottenBtn");
const dirBtns1 = document.getElementsByClassName("dirBtns1");
const dirBtns2 = document.getElementsByClassName("dirBtns2");
const eatBtn = document.getElementById("eatBtn");
const backBtn = document.getElementById("backBtn");
const alertBox = document.getElementById("alertBox");
const alertTxt = document.getElementById("alert");
const alertBtn = document.getElementById("alertBtn")

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

function storeData() {
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
            Array.from(points).map((i) => i.style.display = "none");
            Array.from(pointChange).map((i) => i.style.display = "none");
            eatBtns.style.display = "none";
            break;
        case 1:
            inputs.style.display = "none";
            nameBtn.style.display = "none";
            changeWindBtn.style.display = "none";
            btns.style.display = "";
            Array.from(points).map((i) => i.style.display = "");
            Array.from(pointChange).map((i) => i.style.display = "none");
            eatBtns.style.display = "none";
            break;
        case 2:
            inputs.style.display = "none";
            nameBtn.style.display = "none";
            changeWindBtn.style.display = "none";
            btns.style.display = "none";
            Array.from(points).map((i) => i.style.display = "none");
            Array.from(pointChange).map((i) => i.style.display = "");
            eatBtns.style.display = "";
            break;
    }
    renderTable();
}

function toggleAlert (text = "") {
    text?alertBox.style.display="":alertBox.style.display="none";
    alertTxt.textContent = text;
}
toggleAlert();

function clearTable () {
    localStorage.clear();
    windNum = 0;
    roundNum = 0;
    initNum = 0;
    playerNames = ["", "", "", ""];
    pointsNum = [100, 100, 100, 100];
}

function renderTable () {
    wind.textContent = directionsName[windNum];
    for (let i = 0; i < 4; i++) {
        directions[i].textContent = directionsName[[2, 1, 3, 0].map((i) => (i + initNum + roundNum) % 4)[i]]
        players[i].textContent = playerNames[[2, 1, 3, 0].map((i) => (i + roundNum) % 4)[i]];
        points[i].textContent = pointsNum[[2, 1, 3, 0].map((i) => (i + roundNum) % 4)[i]];
        document.getElementById("tableColumn").style.transform="translateX("+(playersBox[2].offsetWidth/2-playersBox[1].offsetWidth/2)+"px)"
    }
}

function changeTable () {
    roundNum = (roundNum + 1) % 4;
    if (!roundNum) {
        windNum += 1;
    }
}

if (!localStorage.getItem("windNum")) {
    clearTable();
    showSection(0);
} else {
    windNum = parseInt(localStorage.getItem("windNum"));
    roundNum = parseInt(localStorage.getItem("roundNum"));
    initNum = parseInt(localStorage.getItem("initNum"));
    playerNames = JSON.parse(localStorage.getItem("playerNames"));
    pointsNum = JSON.parse(localStorage.getItem("pointsNum"));
    showSection(1);
    renderTable();
}

alertBtn.addEventListener("click", () => {
    toggleAlert();
});

nameBtn.addEventListener("click", () => {
    playerNames = Array.from(inputs.getElementsByTagName("input")).map((input) => input.value);
    if (playerNames.includes("")) {
        toggleAlert("名唔可以空")
    } else {
        showSection(1);
        storeData();
        renderTable();
    }
});

changeWindBtn.addEventListener("click", () => {
    initNum += 1;
    storeData();
    renderTable();
});

clearBtn.addEventListener("click", () => {
    clearTable();
    showSection(0);
    renderTable();
});

gottenBtn.addEventListener("click", () => {
    showSection(2);
});

Array.from(selBtns).map((i) => {
    i.addEventListener("click", () => {
        i.classList.toggle("pri");
        i.classList.toggle("sec");
    });
});

givenBtn.addEventListener("click", () => {
    given = true;
    showSection(2);
});

gottenBtn.addEventListener("click", () => {
    given = false;
    showSection(2);
});

Array.from(dirBtns1).map((dirBtn, index) => {
    dirBtn.addEventListener("click", () => {
        if (index == givenFrom) {
            givenFrom = -1;
        } else {
            if (givenFrom != -1) {
                dirBtns1[givenFrom].classList.toggle("pri");
                dirBtns1[givenFrom].classList.toggle("sec");
            }
            givenFrom = index;
        }
    });
});

Array.from(dirBtns2).map((dirBtn, index) => {
    dirBtn.addEventListener("click", () => {
        if (index == givenTo) {
            givenTo = -1;
        } else {
            if (givenTo != -1) {
                dirBtns2[givenTo].classList.toggle("pri");
                dirBtns2[givenTo].classList.toggle("sec");
            }
            givenTo = index;
        }
    });
});

backBtn.addEventListener("click", () => {
    showSection(1);
});

eatBtn.addEventListener("click", () => {
    
});
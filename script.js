let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newBtn = document.querySelector("#new-game-btn");
let msgTitle = document.querySelector(".msg-title");
let turnMsg = document.querySelector(".turn-msg");


let turnO = true;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");
            turnO = false;
            turnMsg.innerText = "Player X's turn ";
        } else {
            box.innerText = "X";
            box.classList.add("X");
            turnO = true;
            turnMsg.innerText = "Player O's turn";
        }
        box.disabled = true;

        checkWinner();
    });
});

const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
    newBtn.classList.add("hide");
    boxes.forEach(box => {
        box.classList.remove("X");
        box.classList.remove("O");
    });
    turnMsg.innerText = "Player O's turn";
};

const disableBox = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msgTitle.innerText = `Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    newBtn.classList.remove("hide");
    disableBox();
    turnMsg.innerText = "";
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner is", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
    checkDraw();
};

const enableBox = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const checkDraw = () => {
    
    let count = 0;

    boxes.forEach(box => {
        if (box.innerText != ""){
            count ++; 
        }
    });

    if (count === 9 ){
        msgTitle.innerText = "Its a Draw!!";
        msgContainer.classList.remove("hide");
        newBtn.classList.remove("hide");
        disableBox();
        turnMsg.innerText = "";
    }
};
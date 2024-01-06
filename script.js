let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let wincontainer = document.querySelector(".win-container");
let msg = document.querySelector(".msg");
let audioturn = new Audio("stuff/ting.mp3");
let gameover = new Audio("stuff/gameover.mp3");


let turn0 = true;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

//reset game
const resetGame = () => {
    turn0 = true;
    anableBoxes();

    wincontainer.classList.add("win-container");
    for (let box of boxes) {
        box.style.backgroundColor = ""; // Reset box background color
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerHTML = "0";
            turn0 = false;
            audioturn.play();
        } else {
            box.innerHTML = "X"
            turn0 = true
            audioturn.play();
        }
        box.disabled = true;
        checkWinner();

    })
})

//disable boxes once winner found
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;

        gameover.play();


    }
}

//anable boxes blank while reset game
const anableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}


//function to show wiinner
const showWinner = (winner, positions) => {
    msg.innerHTML = `Congratulation, Winner is ${winner}`;
    wincontainer.classList.remove("win-container");
    disableBoxes();

    for (let position of positions) {
        boxes[position].style.backgroundColor = "lightgray";
    }

}


//function to checkwinner by matching winner pattern
const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let position1 = boxes[pattern[0]].innerHTML;
        let position2 = boxes[pattern[1]].innerHTML;
        let position3 = boxes[pattern[2]].innerHTML;

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 == position2 && position2 == position3) {
                showWinner(position1, pattern);
                break;
            }
        }

    }
}

//reset btn click.
resetbtn.addEventListener("click", resetGame);
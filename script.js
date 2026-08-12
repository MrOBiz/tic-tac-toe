function Screen() {
    const body = document.querySelector("body");

    for(let i = 0; i < 9; i++){
        const square = document.createElement("div");
        square.style.backgroundColor = "grey";
        square.style.width = "80px";
        square.style.height = "80px";
        square.style.margin = "10px";
        square.style.border = "4px";

        body.appendChild(square);
    }

}

function Game() {
    let myBoard = GameBoard();
    let turnFlag = 0;

    const Players = [{ name: "Bob", token: "X"},
                    { name: "Jane",token: "O"}] 

    let activeP = Players[0]; 
    
    const switchTurn = () => {
        activeP = activeP === Players[0]? Players[1] : Players[0];
    }

    const printActiveP = () => {
        console.log(activeP.name + "'s turn.");
    }

    const getActivePToken = () => {
        return (activeP.token);
    }

    const playRound = (row, col) => {
        if(row < 0 || row > myBoard.getBoardSide() - 1 ||
            col < 0 || col > myBoard.getBoardSide() - 1){
            console.log("Invalid move.");
            printActiveP();
            return;
        }else if(myBoard.getCellContent()[row][col] === "-"){
            myBoard.placeToken(row, col, getActivePToken());
            
            myBoard.printCellContent();

            checkWin();
            switchTurn();
            printActiveP();

        }else{
            console.log("Taken.");
            console.log("Still " + activeP.name + "'s turn.");
            return;
        }
    }

    const checkWin = () => {
        for(let elt of myBoard.getCellContent()){
            if(elt[0] === elt[1] && elt[1] === elt[2]){
                switch (elt[0]){
                    case "X":
                        printWinner(Players[0].name);
                        resetGame();
                        break;
                    
                    case "O":
                        printWinner(Players[1].name);
                        resetGame();
                        break;

                    case "-":
                        break;
                }
            }
        }

        for(let i = 0; i < myBoard.getCellContent()[1].length; i++){
            let arr = [];
            for(let j = 0; j < myBoard.getCellContent()[1].length; j++){
                arr.push(myBoard.getCellContent()[j][i]);
            } 

            if(arr[0] === arr[1] && arr[1] === arr[2]){
                switch (arr[0]){
                    case "X":
                        printWinner(Players[0].name);
                        resetGame();
                        break;
                    
                    case "O":
                        printWinner(Players[1].name);
                        resetGame();
                        break;

                    case "-":
                        break;
                }
            }  
        }   

        let diagOne = [myBoard.getCellContent()[0][0], 
                    myBoard.getCellContent()[1][1],
                    myBoard.getCellContent()[2][2]];

        let diagTwo = [myBoard.getCellContent()[2][0], 
                    myBoard.getCellContent()[0][2],
                    myBoard.getCellContent()[1][1]];

        if(diagOne[0] === diagOne[1] && 
            diagOne[1] === diagOne[2]){
            switch (diagOne[0]){
                case "X":
                    printWinner(Players[0].name);
                    resetGame();
                    break;
                
                case "O":
                    printWinner(Players[1].name);
                    resetGame();
                    break;

                case "-":
                    break;
            }
        }else if(diagTwo[0] === diagTwo[1] && 
                    diagTwo[1] === diagTwo[2]){
            switch (diagTwo[0]){
                case "X":
                    printWinner(Players[0].name);
                    resetGame();
                    break;
                
                case "O":
                    printWinner(Players[1].name);
                    resetGame();
                    break;

                case "-":
                    break;
            }
        }
        
        if(!myBoard.getCellContent().some(row =>
            row.some((elt) => elt === "-")) ){
            console.log("IT'S A DRAW!");
            resetGame();
            return;
        } 
    } 

    const printWinner = (winner) => {
        console.log(winner + " WINS!");
    }

    const resetGame = () => {
        activeP = Players[0];
        myBoard = GameBoard();
    }
    
    printActiveP();
    return { getActivePToken, playRound, }; 
}

function GameBoard() {
    const board = [];
    const side = 3;

    const getBoardSide = () => {
        return side;
    }

    const createBoard = () => {
            for(let i = 0; i < side; i++){
                board[i] = [];
                for(let j = 0; j < side; j++){
                    board[i].push(Cell());
                }
            }
    }

    const getCellContent = () => {
        let arr = [];
        for(let i = 0; i < side; i++){
            arr[i] = [];
            for(let j = 0; j < side; j++){
                arr[i].push(board[i][j].getValue());
            }
        }
        return arr;
    }

    const printCellContent = () => {
        const rows = getCellContent();
        for(let i = 0; i < side; i++){
            console.log(rows[i]);
        }
    }

    function placeToken(i, j, player){ 
        board[i][j].addToken(player);
    }

    createBoard();  //BUILD IN BODY

    return { getBoardSide, getCellContent, 
            printCellContent, placeToken };
}

function Cell() {
    let value = "-";

    const addToken = (player) => value = player;
    const getValue = () => value;

    return {addToken, getValue};
}

const screen = Screen();
const game = Game();

game.playRound(0, 0);  //ROW WIN CON
game.playRound(1, 1);
game.playRound(0, 1);
game.playRound(2, 2);
game.playRound(0, 2);

//GAME DOESN'T STOP AFTER SOMEONE WINS

game.playRound(1, 2);  //COL WIN CON
game.playRound(0, 1);
game.playRound(2, 2);
game.playRound(1, 0);
game.playRound(0, 2);

game.playRound(2, 0);   //DIAGTWO CON
game.playRound(0, 0);
game.playRound(1, 1);
game.playRound(0, 1);
game.playRound(0, 2);

game.playRound(0, 0);   //DIAGONE CON
game.playRound(0, 2);
game.playRound(1, 1);
game.playRound(0, 1);
game.playRound(2, 2);

game.playRound(0, 0);   //DRAW
game.playRound(0, 1);
game.playRound(1, 0);
game.playRound(1, 1);   //DRAW
game.playRound(2, 1);
game.playRound(2, 0);
game.playRound(1, 2);   //DRAW
game.playRound(2, 2);
game.playRound(0, 2);
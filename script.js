function Game() {
    let myBoard = GameBoard();
    let turnFlag = 0;
    let pOneCount = 0;
    let pTwoCount = 0;

    const Players = [{ name: "P1", token: "X"},
                    { name: "P2",token: "O"}] 

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
            turnFlag += 1;

            checkWin();
            if(turnFlag != 3){
                switchTurn();
                printActiveP();
            }

        }else{
            console.log("Taken.");
            console.log("Still " + activeP.name + "'s turn.");
            return;
        }
    }

    const checkWin = () => {
        /*
            ADD P1 WIN CONDITION 
            P2 WIN CONDITION
            DRAW

            WIN CONDITIONS: FOR BOTH SYMBOLS
            3 ON SAME ROW *3
            3 ON SAME COLUMN *3
            3 ON DIAGONAL *2
            IF BOARD FULL BUT NO CONDITION --> DRAW            
        */
        
        pOneCount = 0;
        pTwoCount = 0;

        for(let elt of myBoard.getCellContent()){
            if(elt === "X"){
                pOneCount += 1;
            }else if(elt === "O"){
                pTwoCount += 1;
            }else{
                return;
            }
        }

        printWinner();
    } 

    const printWinner = () => {
        
    }

    const resetGame = () => {
        pOneCount = 0;
        pTwoCount = 0;
        turnFlag = 0;
        activeP = Players[0];
        myBoard = GameBoard();
    }
    
    printActiveP();
    return { getActivePToken, playRound }; 
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


const game = Game();

game.playRound(0, 0);
game.playRound(1, 1);

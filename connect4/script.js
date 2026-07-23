function Gameboard(){
    const rows = 6;
    const columns = 7;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
}


const getBoard = () => board;

const dropToken = (column, player) => {}
import { Injectable } from '@angular/core';
import { GameStatus, Symbol } from '../gameStatus';
import { GameService } from './game.service';
import { PlayerService } from './player.service';
import { ChangeDetectorRef } from '@angular/core';
interface IMovesLog {
  description: string,
  board: any,
  lastMove: boolean
}
@Injectable({
  providedIn: 'root',
})


export class BoardService {
  public board = [
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
  ];

  public movesLog: IMovesLog[] = [{description: "", board:[
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
  ], lastMove: false}];

  constructor(
    public gameService: GameService,
    public playerService: PlayerService,
  ) {}

  public clickCell(row: number, index: number) {
    if(this.gameService.gameStatus !== GameStatus.InProgres) return;
    if (this.gameService.firstPlayerTurn && this.board[row][index] === Symbol.EMPTY) {
      this.board[row][index] = this.playerService.playerOne.symbol;
      this.gameService.changePlayer();
      this.populateLogs(this.playerService.playerOne.name, row, index, this.playerService.playerOne.symbol)
      this.checkBoardForWinner(this.board);
      return ;
    }

     if(this.board[row][index] === Symbol.EMPTY){
       this.board[row][index] = this.playerService.playerTwo.symbol;
       this.gameService.changePlayer();
     }
     this.populateLogs(this.playerService.playerTwo.name, row, index, this.playerService.playerTwo.symbol)
     this.checkBoardForWinner(this.board);
  }

  public resetGame(){
    this.board = [
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    ];
    this.gameService.setFirstPlayerTurn(true)
    this.gameService.handleWinnerGame(GameStatus.InProgres)
    this.gameService.startGame = false;
    this.movesLog = [{description: "", board:[
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    ], lastMove: false}]
  }

  public checkBoardForWinner(x: Symbol[][]) {
  let winners = new Set();

  // columns check
  for (let i = 0; i < 3; i++) {
    if (x[0][i] !== Symbol.EMPTY && (new Set([x[0][i], x[1][i], x[2][i]])).size === 1) {
      winners.add(x[0][i]);
    }
  }

  // rows check
  for (let i = 0; i < 3; i++) {
    if (x[i][0] !== Symbol.EMPTY && (new Set(x[i])).size === 1) {
      winners.add(x[i][0]);
    }
  }

  // diagonals check
  if (x[1][1] !== Symbol.EMPTY && ((new Set([x[0][0], x[1][1], x[2][2]])).size === 1 || (new Set([x[0][2], x[1][1], x[2][0]])).size === 1)) {
    winners.add(x[1][1]);
  }

  if (winners.size === 2) {
    return "error";
  }

  if (winners.size === 0) {
    // completion check
    if (x.every(y => y.every(z => z))){
      return "draw";
    }

    return "incomplete";
  }

  let winnerVal = winners.values().next().value;
  if(winnerVal === Symbol.CIRCLE){
    this.gameService.handleWinnerGame(GameStatus.FirstPlayerWin)
    this.movesLog = [...this.movesLog,
      {description:`${this.playerService.playerOne.name} won the game`,
  board: [...this.board], lastMove: true}]
    return
  }
  this.gameService.handleWinnerGame(GameStatus.SecondPlayerWin)
  this.movesLog = [...this.movesLog,
    {description:`${this.playerService.playerTwo.name} won the game`,
board: [...this.board], lastMove: true}]


  return
}

public populateLogs(playerName: string, row: number, index: number, symbol: Symbol){
  let currentMove = playerName + " clicked on " + `[${row}][${index}]` + " the symbol " + symbol
  let log={
    description: currentMove,
    board: [...this.board],
    lastMove: true,
  }
    this.movesLog = [...this.movesLog, log]

  if(this.movesLog.length > 1 ){
    this.movesLog[this.movesLog.length - 2].lastMove = false;
  }
}


public clickLog(index: number){
  console.log(this.movesLog[index].board)
  if(!this.movesLog[index].lastMove){
    this.gameService.handleWinnerGame(GameStatus.Pause);
    return
  }

  this.gameService.handleWinnerGame(GameStatus.InProgres);


}

}

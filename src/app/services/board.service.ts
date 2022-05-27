import { Injectable } from '@angular/core';
import { Symbol } from '../gameStatus';
import { GameService } from './game.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public board = [
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
  ];
  constructor(
    public gameService: GameService,
    public playerService: PlayerService
  ) {}

  public clickCell(row: number, index: number) {
    if (this.gameService.firstPlayerTurn && this.board[row][index] === Symbol.EMPTY) {
      this.board[row][index] = this.playerService.playerOne.symbol;
      this.gameService.changePlayer();
      return;
    }
     if (
       this.gameService.singlePlayer &&
       this.board[row][index] === Symbol.EMPTY
     ) {
       this.board[row][index] = this.playerService.playerPc.symbol;
       this.gameService.changePlayer();
       return;
     }
     if(this.board[row][index] === Symbol.EMPTY){
       this.board[row][index] = this.playerService.playerTwo.symbol;
       this.gameService.changePlayer();
     }
     let test = this.winner(this.board);
     console.log(test, "----->");
  }

  public resetGame(){
    this.board = [
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
      [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY],
    ];
    this.gameService.setFirstPlayerTurn(true)
  }

  public winner(x: Symbol[][]) {
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

  return winners.values().next().value;
}
}

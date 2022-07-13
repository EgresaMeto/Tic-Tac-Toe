import { Injectable } from '@angular/core';
import { GameStatus } from '../gameStatus';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public startGame: boolean;
  public gameStatus: GameStatus;
  public firstPlayerTurn: boolean;

  constructor() {
    this.startGame = false;
    this.gameStatus = GameStatus.NotStarted;
    this.firstPlayerTurn = true;
  }

  public play() {
    this.startGame = !this.startGame;
    this.gameStatus = GameStatus.InProgres;
  }

  public changePlayer() {
    this.firstPlayerTurn = !this.firstPlayerTurn;
  }
  public setFirstPlayerTurn(value: boolean) {
    this.firstPlayerTurn = value;
  }

  public handleWinnerGame(value: GameStatus) {
    this.gameStatus = value;
  }

  public handleLosserGame(value: GameStatus) {
    this.gameStatus = value;
  }
}

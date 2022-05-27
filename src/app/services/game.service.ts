import { Injectable } from '@angular/core';
import { GameStatus } from '../gameStatus';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public startGame: boolean;
  public singlePlayer: boolean;
  public gameStatus: GameStatus;
  public firstPlayerTurn: boolean;

  constructor() {
    this.startGame = false;
    this.singlePlayer = true;
    this.gameStatus = GameStatus.NotStarted;
    this.firstPlayerTurn = true;
  }

  public setPlayerNumber = (value: boolean) => {
    this.singlePlayer = value;
  };
  public play() {
    this.startGame = !this.startGame;
  }

  public changePlayer(){
    this.firstPlayerTurn = !this.firstPlayerTurn;
  }
  public setFirstPlayerTurn(value: boolean){
    this.firstPlayerTurn = value
  }
}

import { Injectable } from '@angular/core';
import { Symbol } from '../gameStatus';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public playerOne = {
    name: 'Player 1',
    symbol: Symbol.CIRCLE,
  };

  public playerTwo = {
    name: 'Player 2',
    symbol: Symbol.CROSS,
  };

  public change(event: any, player: number) {
    if (player === 1) {
      this.playerOne.name = event.target.value;
      return;
    }
    this.playerTwo.name = event.target.value;
  }

  public getPlayerSymbol(player: number) {
    if (player === 0) {
      return this.playerOne.symbol;
    }
      return this.playerTwo.symbol;
  }
  constructor() {}
}

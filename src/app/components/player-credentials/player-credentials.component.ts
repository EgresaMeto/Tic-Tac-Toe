import { PlayerService } from './../../services/player.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-credentials',
  templateUrl: './player-credentials.component.html',
  styleUrls: ['./player-credentials.component.css'],
})
export class PlayerCredentialsComponent implements OnInit {
  constructor(
    public gameService: GameService,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void {}
}

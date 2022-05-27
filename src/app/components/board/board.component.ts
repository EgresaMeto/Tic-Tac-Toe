import { PlayerService } from './../../services/player.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  constructor(public gameService: GameService, public playerService: PlayerService, public boardService: BoardService) {}


  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import{MatButtonModule} from '@angular/material/button';
import { BoardComponent } from './components/board/board.component';
import { PlayerCredentialsComponent } from './components/player-credentials/player-credentials.component';
@NgModule({
  declarations: [AppComponent, GameComponent, BoardComponent, PlayerCredentialsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

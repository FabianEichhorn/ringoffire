import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any = '' ;
  game!: Game;

  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  takeCard() {
    if (!this.pickCardAnimation) {
    this.game.currentCard = this.game.stack.pop(); //mit pop nehmen wir den letzten wert aus unserem Array und wird gleichzeitig aus dem array entfernt
    this.pickCardAnimation = true;
    console.log('New Card:', this.currentCard)
    console.log('Game is', this.game)

    setTimeout (() => {
      this.game.playedCards.push(this.game.currentCard);
      this.pickCardAnimation = false;
    }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }






}





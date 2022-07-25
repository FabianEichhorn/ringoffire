import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '' ;
  game!: Game;
  gameId: string;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: ActivatedRoute,
    ) { }

  ngOnInit(): void {
   this.newGame(); 
    this.router.params.subscribe((params) => {
      this.gameId = params['id'];
    console.log(params['id']);

    this.firestore
        .collection('games')
        .doc(params['id'])
        .valueChanges()
        .subscribe((game:any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
        });
      
  })

      
   
  }


  newGame() {
    this.game = new Game();
/*     this.firestore
      .collection('games')
      .add(this.game.toJson()); */
  }

  takeCard() {
    if (!this.pickCardAnimation) {
    this.game.currentCard = this.game.stack.pop(); //mit pop nehmen wir den letzten wert aus unserem Array und wird gleichzeitig aus dem array entfernt
    this.pickCardAnimation = true;
    console.log('New Card:', this.game.currentCard)
    console.log('Game is', this.game)
    this.game.currentPlayer ++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

    setTimeout (() => {
      this.game.playedCards.push(this.game.currentCard);
      this.pickCardAnimation = false;
    }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0) {
      this.game.players.push(name);
      }
    });
  }






}





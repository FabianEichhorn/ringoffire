import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game!: Game;
  gameId: string;
  gameOver = false;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
   this.newGame(); 
    this.route.params.subscribe((params) => {
      this.gameId = params.id;
    console.log(params.id);

    this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game:any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.player_images = game.player_images;
        });
      
  })

      
   
  }


  newGame() {
    this.game = new Game();

  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else  if (this.game.players.length > 1) {
      if (!this.game.pickCardAnimation) {
      this.pickCardAction();

      setTimeout (() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
  } 
    } else {
      alert('Alone drinking is not fun, add at least 2 players!')
    }
  }


  pickCardAction() {
    this.game.currentCard = this.game.stack.pop(); //mit pop nehmen wir den letzten wert aus unserem Array und wird gleichzeitig aus dem array entfernt
      this.game.pickCardAnimation = true;
      console.log('New Card:', this.game.currentCard)
      console.log('Game is', this.game)
      this.game.currentPlayer ++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      

    dialogRef.afterClosed().subscribe( (name) => {
      if(name && name.length > 0 && name.length < 16) {
      this.game.players.push(name);
      this.game.player_images.push('avatar-g2a332f472_1280.png');
      this.saveGame();
      }else  {
        alert('Player name must be between 1 and 16 characters');
      }
    });
  }


  saveGame() {
    this.firestore
        .collection('games')
        .doc(this.gameId)
        .update(this.game.toJson());
  }


  editPlayer(playerId: number) {
    console.log('edit Player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe(change => {
      if (change) {
        if(change == 'DELETE') {
          this.game.players.splice(playerId, 1)
          this.game.player_images.splice(playerId, 1)
        } else {
          console.log('Received Changes', change);
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }


}





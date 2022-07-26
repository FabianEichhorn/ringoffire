import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }// wir wollen auf neue Seite weiterleiten dadurch brauchen wir den private router weil wir den nur in dieser componente verwenden wollen sonst puplic

  ngOnInit(): void {
  }

  newGame() {
    //start game 
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then ( (gameInfo:any) => {
        console.log(gameInfo);
        
        this.router.navigateByUrl('/game/' + gameInfo.id);
      })

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router) { } // wir wollen auf neue Seite weiterleiten dadurch brauchen wir den private router weil wir den nur in dieser componente verwenden wollen sonst puplic

  ngOnInit(): void {
  }

  newGame() {
    //start game 
    this.router.navigateByUrl('/game')
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['avatar-g2a332f472_1280.png', 'avatar-g2eddb4290_1280.png', 'avatar-gcbe2e4d30_1280.png']

  constructor() { }

  ngOnInit(): void {
  }

}

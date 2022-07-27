import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['avatar-g2a332f472_1280.png', 'avatar-g2eddb4290_1280.png', 'avatar-gcbe2e4d30_1280.png']

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
  }


  onNoClick() {
    this.dialogRef.close();
  }
}

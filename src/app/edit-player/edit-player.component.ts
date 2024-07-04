import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent implements OnInit {
  allProfilePictures: string[] = [
    'man.jpg',
    'woman.png',
    'monkey.png',
    'pinguin.svg',
    'serious-woman.svg',
    'winkboy.svg',
  ];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

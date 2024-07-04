import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent implements OnInit {
  allProfilePictures: string[] = [
    'man.jpg',
    'woman.jpg',
    'monkey.jpg',
    'pinguin.svg',
    'serious-woman.svg',
    'winkboy.svg',
  ];
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

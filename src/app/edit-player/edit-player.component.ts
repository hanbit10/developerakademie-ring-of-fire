import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent implements OnInit {
  allProfilePictures: string[] = [];
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

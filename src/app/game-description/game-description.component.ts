import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-description',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-description.component.html',
  styleUrl: './game-description.component.scss',
})
export class GameDescriptionComponent {}

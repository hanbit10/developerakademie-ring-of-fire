import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss',
})
export class DialogAddPlayerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}
  animal(): any {
    // throw new Error('Method not implemented.');
  }
  onNoClick() {
    // throw new Error('Method not implemented.');
    this.dialogRef.close();
  }
  name: string[] = [];
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

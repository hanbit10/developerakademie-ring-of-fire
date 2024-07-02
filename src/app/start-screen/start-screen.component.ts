import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  newGame() {
    let game = new Game();
    this.addGame(game.toJson());
  }

  addGame(gameJson: any) {
    addDoc(collection(this.firestore, 'games'), gameJson).then(
      (gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      },
    );
  }
}

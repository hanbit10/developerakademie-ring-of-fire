import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    GameDescriptionComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: any;
  gameId!: string;
  gameData: any;
  firestore: Firestore = inject(Firestore);
  item$: any;
  unsubList!: Unsubscribe;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });

    console.log(this.gameId);
    this.unsubList = onSnapshot(
      doc(collection(this.firestore, 'games'), this.gameId),
      (firebaseData: any) => {
        this.game = firebaseData.data();
        // console.log('this is game data', this.gameData);
        // this.game.players = this.gameData.players;
        // this.game = this.gameData;
        console.log('this is game', this.game);
      },
    );
    // console.log(this.gameData);
    // console.log('this is game', this.game);

    // this.game.players = this.gameData.players;
    // const itemCollection = collection(this.firestore, 'games');
    // collectionData(itemCollection).
    // this.item$ = collectionData(itemCollection);
    // this.getGames().valueChanges().toPromise()
    // this.firestore.collection('games').valueChanges.subscribe((games: any) => {
    //   console.log('games', games);
    // });
  }
  newGame() {
    this.game = new Game();
  }

  ngOnDestroy() {
    this.unsubList();
  }

  async addGame(gameJson: any) {
    await addDoc(collection(this.firestore, 'games'), gameJson);
  }

  async updateGame(gameJson: any) {
    await updateDoc(doc(this.firestore, 'games', this.gameId), gameJson);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop()!;
      this.saveGame();
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      console.log('The dialog was closed', name);
      if (name && name.length > 0) {
        console.log('game', this.game);
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.updateGame(this.game.toJson());
  }
}

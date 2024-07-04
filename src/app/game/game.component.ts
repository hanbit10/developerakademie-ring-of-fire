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
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    PlayerMobileComponent,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    GameDescriptionComponent,
    EditPlayerComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  // pickCardAnimation = false;
  // currentCard: string = '';
  game!: Game;
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
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });
    console.log(this.gameId);
    this.unsubList = onSnapshot(
      doc(collection(this.firestore, 'games'), this.gameId),
      (firebaseData: any) => {
        this.gameData = firebaseData.data();
        this.game.players = this.gameData.players;
        this.game.player_images = this.gameData.player_images;
        this.game.stack = this.gameData.stack;
        this.game.playedCards = this.gameData.playedCards;
        this.game.currentPlayer = this.gameData.currentPlayer;
        this.game.pickCardAnimation = this.gameData.pickCardAnimation;
        this.game.currentCard = this.gameData.currentCard;
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

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Received change', change);
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
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
    if (!this.game.pickCardAnimation) {
      this.game.pickCardAnimation = true;
      this.game.currentCard = this.game.stack.pop()!;
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
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
        this.game.player_images.push('man.jpg');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.updateGame(this.game.toJson());
  }
}

import { inject, Injectable } from '@angular/core';
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
import { Game } from '../../models/game';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  firestore: Firestore = inject(Firestore);
  game!: Game;
  gameId!: string;
  gameData: any;
  item$: any;
  unsubList!: Unsubscribe;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });
    // console.log(this.gameId);
    onSnapshot(
      doc(collection(this.firestore, 'games'), 'v0ZczjbAINjDnyuYxOD1'),
      (firebaseData: any) => {
        this.game = firebaseData.data();
        console.log('this is game data', this.gameData);
      },
    );
  }

  // console.log('gameId', this.gameId);
  // this.unsubList = onSnapshot(
  //   doc(collection(this.firestore, 'games'), this.gameId),
  //   (firebaseData: any) => {
  //     this.game = firebaseData.data();
  //     // console.log('this is game data', this.gameData);
  //     // this.game.players = this.gameData.players;
  //     // this.game = this.gameData;
  //     // console.log('this is game', this.game);
  //   },
  // );
  // c
  // this.getAll();

  // getData(param: any) {
  //   let gameData;
  //   this.unsubList = onSnapshot(
  //     doc(collection(this.firestore, 'games'), param),
  //     (firebaseData: any) => {
  //       gameData = firebaseData.data();
  //       return gameData;
  //     },
  //   );
  // }

  async addGame(gameJson: any) {
    await addDoc(collection(this.firestore, 'games'), gameJson);
  }

  async updateGame(gameJson: any) {
    await updateDoc(doc(this.firestore, 'games', this.gameId), gameJson);
  }
}

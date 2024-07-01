import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-fec0a',
        appId: '1:961774548053:web:8513ce42fdf7e5c3ca90dc',
        storageBucket: 'ring-of-fire-fec0a.appspot.com',
        apiKey: 'AIzaSyCBWaZqfSe1K3U3Vrcg_tj3LttgsOA-sU8',
        authDomain: 'ring-of-fire-fec0a.firebaseapp.com',
        messagingSenderId: '961774548053',
        measurementId: 'G-PZWPKYQC3F',
      }),
    ),
    provideFirestore(() => getFirestore()),
  ],
};

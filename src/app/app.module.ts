import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Importation de Firebase et AngularFire modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Importez votre configuration Firebase à partir de votre fichier environment
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Initialisez Firebase avec AngularFire
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // Si vous utilisez l'authentification Firebase
    AngularFireStorageModule, // Si vous utilisez le stockage Firebase
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {

  
}

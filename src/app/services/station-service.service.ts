import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService {

  constructor(private firestore: AngularFirestore) {}

  // Get all stations from Firebase
  getStations(): Observable<any[]> {
    return this.firestore.collection('stations').valueChanges({ idField: 'id' });
  }

    // Ajouter une nouvelle station à la collection 'stations'
    addStation(station: any): Promise<any> {
      // La méthode add() crée un document avec un ID généré automatiquement
      return this.firestore.collection('stations').add(station);
    }

  // Delete a station by its ID
  deleteStation(id: string): Promise<void> {
    return this.firestore.collection('stations').doc(id).delete();
  }

  // Update an existing station in Firebase
  updateStation(id: string, station: any): Promise<void> {
    return this.firestore.collection('stations').doc(id).update(station);
  }
}

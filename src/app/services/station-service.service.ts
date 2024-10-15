import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService {

  constructor(private fs:AngularFirestore) {
    
   }
   getStation(): Observable<any[]> {
    
    return this.fs.collection('stations').valueChanges();

  }
}

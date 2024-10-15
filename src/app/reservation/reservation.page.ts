import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Firebase Authentication
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reservationDate  !: string;
  reservationTime !: string;
  selectedService !: string;
  fullName!: string; // Add full name
  phoneNumber!: string; // Add phone number
  services = [
    { name: 'Lavage extérieur', price: 20 },
    { name: 'Lavage intérieur', price: 15 },
    { name: 'Lavage complet', price: 35 }
  ];

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth,private firestore: AngularFirestore) {}

  ngOnInit() {
    // Get authenticated user
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Fetch additional details (fullName and phoneNumber) from Firestore
        const userId = user.uid;
        this.firestore.collection('users').doc(userId).valueChanges().pipe(
          map((data: any) => {
            this.fullName = data?.fullName || ''; // Get fullName from Firestore
            this.phoneNumber = data?.phoneNumber || ''; // Get phoneNumber from Firestore
          })
        ).subscribe();
      }
    });
  }

  confirmReservation() {
    console.log('Réservation confirmée pour:', this.fullName, this.phoneNumber, this.reservationDate, this.reservationTime, this.selectedService);
    this.navCtrl.navigateBack('/station-details'); // Navigating back to station details
  }
}

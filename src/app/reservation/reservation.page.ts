import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Firebase Authentication

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

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    // Get user info from Firebase
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.fullName = user.displayName || ''; // Fills with user's name from Firebase
        this.phoneNumber = user.phoneNumber || ''; // Fills with user's phone from Firebase (if available)
      }
    });
  }

  confirmReservation() {
    console.log('Réservation confirmée pour:', this.fullName, this.phoneNumber, this.reservationDate, this.reservationTime, this.selectedService);
    this.navCtrl.navigateBack('/station-details'); // Navigating back to station details
  }
}

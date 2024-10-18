import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StationServiceService } from '../services/station-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import Firebase Auth for logout
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  stations: any[] = []; // Empty array for stations

  constructor(
    private navCtrl: NavController,
    private stationService: StationServiceService, // Corrected the spelling of 'stationService'
    private afAuth: AngularFireAuth, // Firebase Auth for logout
    private router: Router // Router for navigation
  ) {}

  ngOnInit(): void {
    // Fetch stations from the service on page load
    this.stationService.getStations().subscribe((data: any) => { // Use 'getStations()' here
      this.stations = data;
      console.log(this.stations);
    });
  }

  // Function to add an image to a station
  async addImage(station: any) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // Fetch the image from the gallery
      });

      station.image = image.dataUrl; // Assign the selected image to the station
    } catch (error) {
      console.error('Error adding image:', error);
    }
  }

  // Function to navigate to the station details page
  viewStationDetails(station: any) {
    this.navCtrl.navigateForward(`/station-details/${station.id}`); // Navigate to details using station ID
  }

  // Logout function
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Navigate to login page after logout
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  }
}

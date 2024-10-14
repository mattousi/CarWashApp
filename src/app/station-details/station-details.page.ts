import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.page.html',
  styleUrls: ['./station-details.page.scss'],
})
export class StationDetailsPage {
  stationId: string | null = null;  // Initialize stationId with null
  station: any;
  imageUrl: string | undefined; // Stores the selected image's URL

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Get station ID from URL parameters and handle null/undefined
    this.stationId = this.route.snapshot.paramMap.get('id') ?? null;
    
    if (this.stationId) {
      this.station = this.getStationDetails(this.stationId);  // Retrieve station details
    } else {
      console.error('Station ID is null or undefined');
    }
  }

  // Example function to get station details (mock data for now)
  getStationDetails(id: string) {
    const stations = [
      {
        id: '1',
        name: 'Station A',
        address: '123 Rue Principale, Paris',
        services: [
          { name: 'Lavage extérieur', price: 20 },
          { name: 'Lavage intérieur', price: 15 },
          { name: 'Nettoyage des jantes', price: 10 },
          { name: 'Cire et polissage', price: 25 },
          { name: 'Désinfection intérieure', price: 30 },
          { name: 'Nettoyage des tapis', price: 15 }
        ],
        openingHours: {
          monday: '8:00 - 18:00',
          tuesday: '8:00 - 18:00',
          wednesday: '8:00 - 18:00',
          thursday: '8:00 - 18:00',
          friday: '8:00 - 18:00',
          saturday: '9:00 - 14:00',
          sunday: 'Fermé'
        }
      },
      {
        id: '2',
        name: 'Station B',
        address: '456 Avenue des Champs, Lyon',
        services: [
          { name: 'Lavage complet', price: 35 },
          { name: 'Cire et polissage', price: 50 },
          { name: 'Nettoyage en profondeur des sièges', price: 60 },
          { name: 'Désinfection intérieure', price: 35 }
        ],
        openingHours: {
          monday: '8:00 - 18:00',
          tuesday: '8:00 - 18:00',
          wednesday: '8:00 - 18:00',
          thursday: '8:00 - 18:00',
          friday: '8:00 - 18:00',
          saturday: '9:00 - 14:00',
          sunday: 'Fermé'
        }
      }
    ];

    return stations.find(station => station.id === id);
  }

  // Method to select an image from the gallery
  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos  // Select an image from the gallery
      });

      this.imageUrl = image.webPath;  // Store the image URL
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  }

  // Navigate to the reservation page
  bookStation() {
    if (this.station) {
      console.log('Reserving slot for station:', this.station.name);
      // Navigate to the reservation page, passing the stationId
      this.router.navigate(['/reservation', this.stationId]);
    }
  }
}

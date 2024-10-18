import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.page.html',
  styleUrls: ['./station-details.page.scss'],
})
export class StationDetailsPage {
  stationId: string | null = null;  // Initialise stationId à null
  station: any;
  imageUrl: string | undefined; // Stocke l'URL de l'image sélectionnée

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Récupérer l'ID de la station depuis les paramètres de l'URL et gérer null/undefined
    this.stationId = this.route.snapshot.paramMap.get('id') ?? null;
    
    if (this.stationId) {
      this.station = this.getStationDetails(this.stationId);  // Récupérer les détails de la station
    } else {
      console.error('Station ID est null ou non défini');
    }
  }

  // Exemple de fonction pour récupérer les détails de la station (données simulées pour l'instant)
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
      },
      {
        id: '3',
        name: 'Station C',
        address: '789 Boulevard du Soleil, Nice',
        services: [
          { name: 'Lavage extérieur', price: 18 },
          { name: 'Lavage intérieur', price: 12 },
          { name: 'Nettoyage des jantes', price: 8 },
          { name: 'Cire et polissage', price: 28 },
          { name: 'Nettoyage en profondeur des sièges', price: 40 },
          { name: 'Détachage intérieur', price: 35 }
        ],
        openingHours: {
          monday: '8:00 - 17:00',
          tuesday: '8:00 - 17:00',
          wednesday: '8:00 - 17:00',
          thursday: '8:00 - 17:00',
          friday: '8:00 - 17:00',
          saturday: '10:00 - 15:00',
          sunday: 'Fermé'
        }
      }
      
    ];

    return stations.find(station => station.id === id);
  }

  // Méthode pour sélectionner une image depuis la galerie
  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos  // Sélectionner une image depuis la galerie
      });

      this.imageUrl = image.webPath;  // Stocker l'URL de l'image
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
    }
  }

  // Naviguer vers la page de réservation
  bookStation() {
    if (this.station) {
      console.log('Réservation en cours pour la station :', this.station.name);
      // Naviguer vers la page de réservation en passant stationId
      this.router.navigate(['/reservation', this.stationId]);
    }
  }
}

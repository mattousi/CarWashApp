import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StationServiceService } from '../../services/station-service.service';

interface Station {
  name: string;
  address: string;
  id?: string; // Propriété ID optionnelle
}

@Component({
  selector: 'app-add-station-modal',
  templateUrl: './add-station-modal.component.html',
  styleUrls: ['./add-station-modal.component.scss'],
})
export class AddStationModalComponent {
  station: Station = { name: '', address: '' }; // Initialise les données de la station
  isSubmitting = false; // Indicateur pour éviter les soumissions multiples

  constructor(
    private modalCtrl: ModalController,
    private stationService: StationServiceService
  ) {}

  // Fermer le modal sans sauvegarder
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  // Sauvegarder la nouvelle station et fermer le modal
  async saveStation() {
    if (this.isSubmitting) return; // Éviter les soumissions multiples
  
    if (this.station.name && this.station.address) {
      this.isSubmitting = true; // Empêcher d'autres soumissions
      try {
        // Ajouter la station à Firestore; Firestore générera un ID automatiquement
        const docRef = await this.stationService.addStation(this.station);
        const newStationId = docRef.id; // Récupération de l'ID généré par Firestore
        this.station.id = newStationId; // Assignation de l'ID à l'objet station
  
        // Fermer le modal et passer la station ajoutée au composant parent
        this.modalCtrl.dismiss({ newStation: this.station });
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la station:', error);
      } finally {
        this.isSubmitting = false; // Réinitialiser l'indicateur
      }
    } else {
      console.error('Les informations de la station sont incomplètes.');
    }
  }
}

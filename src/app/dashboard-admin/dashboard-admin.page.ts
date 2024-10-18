import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import Firebase authentication
import { Router } from '@angular/router'; // Import Router for navigation
import { StationServiceService } from '../services/station-service.service';
import { AddStationModalComponent } from '../modals/add-station-modal/add-station-modal.component';
import { EditStationModalComponent } from '../modals/edit-station-modal/edit-station-modal.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {
  stations: any[] = [];  // Liste des stations

  constructor(
    private stationService: StationServiceService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,  // Authentification Firebase pour la déconnexion
    private router: Router  // Routeur pour la navigation
  ) {}

  ngOnInit() {
    this.loadStations();  // Charger les stations lors de l'initialisation du composant
  }

  // Charger les stations depuis la base de données Firestore
  loadStations() {
    this.stationService.getStations().subscribe(data => {
      this.stations = data; // Mettre à jour la liste des stations
    });
  }

  // Ouvrir le modal pour ajouter une nouvelle station
  async openAddStationModal() {
    const modal = await this.modalCtrl.create({
      component: AddStationModalComponent,
    });
    await modal.present();
    
    const { data } = await modal.onWillDismiss();

    // Ajoutez la station uniquement si elle est renvoyée
    if (data && data.newStation) {
      const existingStation = this.stations.find(station => station.name === data.newStation.name);
      if (!existingStation) {
        this.stations.push(data.newStation); // Ajoutez seulement si elle n'existe pas déjà
      }
    }
  }

  // Ouvrir le modal pour éditer une station
  async openEditStationModal(station: any) {
    const modal = await this.modalCtrl.create({
      component: EditStationModalComponent,
      componentProps: { station },  // Passer les données de la station au modal
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    // Si la station a été mise à jour, mettez-la à jour dans Firestore
    if (data && data.updatedStation) {
      this.stationService.updateStation(station.id, data.updatedStation).then(() => {
        this.loadStations();  // Recharger les stations pour refléter la station mise à jour
      });
    }
  }

  // Confirmer la suppression d'une station
  async confirmDeleteStation(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cette station ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.stationService.deleteStation(id).then(() => {
              this.loadStations();  // Recharger les stations pour refléter la suppression
            });
          },
        },
      ],
    });
    await alert.present();
  }

  // Méthode de déconnexion
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);  // Naviguer vers la page de connexion après la déconnexion
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion:', error);
    });
  }
}

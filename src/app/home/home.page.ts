import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  stations: any[] = [
    { id: 1, name: 'Station A', address: '123 Rue Principale, Paris', image: null },
    { id: 2, name: 'Station B', address: '456 Avenue des Champs, Lyon', image: null },
    { id: 3, name: 'Station C', address: '789 Boulevard du Sud, Marseille', image: null }
  ];

  constructor(private navCtrl: NavController) {}

  async addImage(station: any) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    station.image = image.dataUrl;
  }

  // Fonction pour naviguer vers la page des détails
  viewStationDetails(station: any) {
    this.navCtrl.navigateForward(`/station-details/${station.id}`);  // Navigue en passant l'ID de la station
  }
}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StationServiceService } from '../services/station-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  stations: any[] = [
  ];

  constructor(private navCtrl: NavController,private stationScervice :StationServiceService ) {}
  ngOnInit(): void {
 
    // console.log(users)
  
    this.stationScervice.getStation().subscribe(data => {
      this.stations= data;
      console.log(this.stations)
    });
 
  }
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

import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage {
  email!: string; // Stocke l'email de l'utilisateur

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Fonction pour réinitialiser le mot de passe
  resetPassword() {
    if (!this.email) {
      this.presentAlert('Erreur', 'Veuillez entrer votre adresse email.');
      return;
    }

    // Simuler l'envoi d'un email de réinitialisation
    this.presentAlert('Succès', 'Un lien de réinitialisation de mot de passe a été envoyé à ' + this.email);
    
    // Redirection après succès
    this.navCtrl.navigateForward('/login');
  }

  // Fonction pour afficher une alerte
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

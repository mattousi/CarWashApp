import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/authentification.service';  // Importation du service d'authentification

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage {
  email!: string; // Stocke l'email de l'utilisateur

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private authService: AuthServiceService  // Injection du service d'authentification
  ) {}

  // Fonction pour réinitialiser le mot de passe
  resetPassword() {
    if (!this.email) {
      this.presentAlert('Erreur', 'Veuillez entrer votre adresse email.');
      return;
    }

    // Utilisation du service AuthService pour envoyer l'email de réinitialisation
    this.authService.resetPassword(this.email)
      .then(() => {
        this.presentAlert('Succès', 'Un lien de réinitialisation de mot de passe a été envoyé à ' + this.email);
        // Redirection après succès
        this.navCtrl.navigateForward('/login');
      })
      .catch((error: Error) => {  // Typage du paramètre 'error' pour éviter l'erreur TypeScript
        this.presentAlert('Erreur', 'Une erreur est survenue lors de la réinitialisation du mot de passe : ' + error.message);
      });
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

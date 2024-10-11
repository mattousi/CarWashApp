import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignUpPage {
  fullName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  phoneNumber!: string;
  carModel!: string;
  licensePlate!: string;
  carType!: string;
  termsAccepted: boolean = false;

  // Ajoutez ces deux propriétés
  passwordType: string = 'password'; // Définit le type par défaut
  passwordIcon: string = 'eye-off-outline'; // Définit l'icône par défaut

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Fonction pour l'inscription
  signUp() {
    if (this.password !== this.confirmPassword) {
      this.presentAlert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (!this.fullName || !this.email || !this.password || !this.phoneNumber || !this.carModel || !this.licensePlate || !this.carType || !this.termsAccepted) {
      this.presentAlert('Erreur', 'Veuillez remplir tous les champs et accepter les termes et conditions.');
      return;
    }

    // Logique d'inscription (API ou backend)
    this.goToLogin();
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

  // Redirection vers la page de connexion (Login)
  goToLogin() {
    this.navCtrl.navigateForward('/login'); // Redirection vers la page Login
  }

  // Gestion de la visibilité du mot de passe
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }
}

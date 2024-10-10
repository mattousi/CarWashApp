import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = ''; 
  password: string = '';
  passwordType: string = 'password'; // Par défaut, le mot de passe est masqué
  passwordIcon: string = 'eye-off-outline'; // Icône pour masquer le mot de passe

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Fonction pour afficher/masquer le mot de passe
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline'; // Icône pour montrer le mot de passe
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline'; // Icône pour masquer le mot de passe
    }
  }

  // Fonction pour afficher une alerte si un champ est vide ou si les informations sont incorrectes
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Logique de connexion
  login() {
    // Vérification si les champs email et mot de passe sont vides
    if (!this.email || !this.password) {
      this.presentAlert('Erreur', 'Veuillez entrer votre email et mot de passe');
      return;
    }

    // Simulate login check
    if (this.email === 'test@example.com' && this.password === 'password') {
      // Redirection vers la page d'accueil en cas de succès
      this.navCtrl.navigateForward('/home');
    } else {
      this.presentAlert('Erreur', 'Email ou mot de passe incorrect');
    }
  }
}

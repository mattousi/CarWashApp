import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth'; // Import Firebase Auth

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

  // Logique de connexion avec Firebase
  login() {
    
    // Vérification si les champs email et mot de passe sont vides
    if (!this.email || !this.password) {
      this.presentAlert('Erreur', 'Veuillez entrer votre email et mot de passe');
      return;
    }

    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
      // Get the user object
      const user = userCredential.user;

      // Retrieve the user's token
      user.getIdToken().then((token) => {
        // Save token to localStorage or sessionStorage
        localStorage.setItem('userToken', token);

        // Redirect to the home page after successful login
        this.navCtrl.navigateForward('/home');
      });
    })
      .catch((error) => {
        this.presentAlert('Erreur', error.message); // Afficher une alerte si la connexion échoue
      });
  }
}

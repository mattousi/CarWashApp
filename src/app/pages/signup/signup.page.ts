import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth'; // Firebase Authentication
import { getFirestore, doc, setDoc } from '@angular/fire/firestore'; // Firebase Firestore

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

  passwordType: string = 'password'; // Par défaut, le mot de passe est masqué
  passwordIcon: string = 'eye-off-outline'; // Icône par défaut pour masquer le mot de passe

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Fonction pour l'inscription
  async signUp() {
    if (this.password !== this.confirmPassword) {
      this.presentAlert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (!this.fullName || !this.email || !this.password || !this.phoneNumber || !this.carModel || !this.licensePlate || !this.carType || !this.termsAccepted) {
      this.presentAlert('Erreur', 'Veuillez remplir tous les champs et accepter les termes et conditions.');
      return;
    }

    try {
      const auth = getAuth();
      const firestore = getFirestore();

      // Créer l'utilisateur dans Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);

      // Stocker les informations supplémentaires dans Firestore
      const userRef = doc(firestore, `users/${userCredential.user.uid}`);
      await setDoc(userRef, {
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        carModel: this.carModel,
        licensePlate: this.licensePlate,
        carType: this.carType,
        createdAt: new Date(),
      });

      // Redirection vers la page de connexion après l'inscription
      this.presentAlert('Succès', 'Compte créé avec succès');
      this.navCtrl.navigateForward('/login');

    } catch (error) {
      // Vérification du type de l'erreur
      if (error instanceof Error) {
        this.presentAlert('Erreur', error.message); // Si l'erreur est une instance d'Error
      } else {
        this.presentAlert('Erreur', 'Une erreur inconnue est survenue');
      }
    }
  }

  // Fonction pour afficher une alerte
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Gestion de la visibilité du mot de passe
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline'; // Change l'icône pour afficher le mot de passe
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline'; // Change l'icône pour masquer le mot de passe
    }
  }
}

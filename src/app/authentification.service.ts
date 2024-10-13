import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importation AngularFireAuth
import firebase from 'firebase/compat/app';  // Importation de firebase/compat
import { User } from 'firebase/auth';  // Utilisation de firebase.User pour éviter les conflits de types

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private ngFireAuth: AngularFireAuth) {}

  // Méthode pour enregistrer un nouvel utilisateur avec email et mot de passe
  async registerUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      console.log('Utilisateur enregistré avec succès', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
      throw error;  // Remonter l'erreur pour gestion dans le composant appelant
    }
  }

  // Méthode pour connecter un utilisateur avec email et mot de passe
  async loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      console.log('Connexion réussie', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      throw error;  // Remonter l'erreur pour gestion dans le composant appelant
    }
  }

  // Méthode pour réinitialiser le mot de passe via email
  async resetPassword(email: string): Promise<void> {
    try {
      await this.ngFireAuth.sendPasswordResetEmail(email);
      console.log('E-mail de réinitialisation envoyé');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation', error);
      throw error;  // Remonter l'erreur pour gestion dans le composant appelant
    }
  }

  // Méthode pour obtenir le profil utilisateur actuellement connecté
  async getProfile(): Promise<firebase.User | null> {  // Utilisation de 'firebase.User'
    return new Promise<firebase.User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);  // Renvoie l'utilisateur Firebase s'il est connecté
        } else {
          resolve(null);  // Renvoie null s'il n'y a pas d'utilisateur connecté
        }
      }, reject);
    });
  }

  // Méthode pour déconnecter l'utilisateur
  async signOut(): Promise<void> {
    try {
      await this.ngFireAuth.signOut();
      console.log('Déconnexion réussie');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
      throw error;  // Remonter l'erreur pour gestion dans le composant appelant
    }
  }
}

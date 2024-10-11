import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './signup-routing.module'; // Corrigez ici si nécessaire
import { SignUpPage } from './signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule  // Assurez-vous que le nom correspond bien
  ],
  declarations: [SignUpPage]
})
export class SignupPageModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'landing', // Redirection vers la page d'accueil (landing)
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./pages/resetpassword/resetpassword.module').then(m => m.ResetpasswordPageModule)
  },
  
  {
    path: 'station-details/:id', // Ajout du paramètre dynamique :id
    loadChildren: () => import('./station-details/station-details.module').then( m => m.StationDetailsPageModule)
  },
  {
    path: 'reservation/:stationId',
    loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationPageModule)
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardAdminPageRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminPage } from './dashboard-admin.page';
import { AddStationModalComponent } from '../modals/add-station-modal/add-station-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardAdminPageRoutingModule
  ],
  declarations: [DashboardAdminPage, AddStationModalComponent]  // No need for entryComponents anymore
})
export class DashboardAdminPageModule {}

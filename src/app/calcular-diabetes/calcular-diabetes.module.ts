import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalcularDiabetesPageRoutingModule } from './calcular-diabetes-routing.module';

import { CalcularDiabetesPage } from './calcular-diabetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalcularDiabetesPageRoutingModule
  ],
  declarations: [CalcularDiabetesPage]
})
export class CalcularDiabetesPageModule {}

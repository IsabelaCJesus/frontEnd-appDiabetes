import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcularDiabetesPage } from './calcular-diabetes.page';

const routes: Routes = [
  {
    path: '',
    component: CalcularDiabetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalcularDiabetesPageRoutingModule {}

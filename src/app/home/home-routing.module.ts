import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'pacientes',
        loadChildren: () => import('../pacientes/pacientes.module').then(m => m.PacientesPageModule),
      },
      /*{
        path: 'alterar-senha-pessoa',
        loadChildren: () => import('../alterar-senha-pessoa/alterar-senha-pessoa.module').then(m => m.AlterarSenhaPessoaPageModule),
      },*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

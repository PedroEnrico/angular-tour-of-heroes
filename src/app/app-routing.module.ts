import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found.component';

const routes: Routes = [
  // Quando rodar o heroes, irá carregar o heroes.module e dentro deste hero.module, tem o heroes-routing.module
  // Dentro do heroes-routing.module irá carregar o '' que é o HeroesComponent. 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then((h) => h.HeroesModule)
  },
  {
    path:'**', component: PageNotFoundComponent
  }
]

@NgModule({
  // Código abaixo: importo para o routerModule as routes e depois exporto o RouterModule
  imports: [ RouterModule.forRoot(routes) ], // .forRoot -> Configura o módulo globalmente no módulo raiz.
  exports: [RouterModule]
})
export class AppRoutingModule { }

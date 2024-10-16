import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'heroes/:id', component: HeroDetailComponent},
  { path: 'heroes', component: HeroesComponent }
]

@NgModule({
  // Código abaixo: importo para o routerModule as routes e depois exporto o RouterModule
  imports: [ RouterModule.forRoot(routes) ], // .forRoot -> Configura o módulo globalmente no módulo raiz.
  exports: [RouterModule]
})
export class AppRoutingModule { }

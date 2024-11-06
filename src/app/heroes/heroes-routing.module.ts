import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  // Para acessar as urls de heroes, o canActivate apontado para AuthGuard deve retornar true.
  { path: '', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: ':id', component: HeroDetailComponent, canActivate: [AuthGuard]}
]

@NgModule({
  // Código abaixo: importo para o routerModule as routes e depois exporto o RouterModule
  imports: [ RouterModule.forChild(routes) ], // .forRoot -> Configura o módulo globalmente no módulo raiz.
  exports: [RouterModule]
})
export class HeroesRoutingModule { }

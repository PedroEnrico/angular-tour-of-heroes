import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes/:id', component: HeroDetailComponent},
  { path: 'heroes', component: HeroesComponent }
]

@NgModule({
  // Código abaixo: importo para o routerModule as routes e depois exporto o RouterModule
  imports: [ RouterModule.forChild(routes) ], // .forRoot -> Configura o módulo globalmente no módulo raiz.
  exports: [RouterModule]
})
export class HeroesRoutingModule { }

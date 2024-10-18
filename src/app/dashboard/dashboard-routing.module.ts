import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent} // Posso carregar vazio aqui pois já carrego o dashboard no app-routing
]

@NgModule({
  // Código abaixo: importo para o routerModule as routes e depois exporto o RouterModule
  imports: [ RouterModule.forChild(routes) ], // .forChild -> Adiciona este módulo como módulo filho do forRoot
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

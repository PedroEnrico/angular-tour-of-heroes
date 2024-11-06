import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // Adicionando a rota de login
  { path: 'login', component: LoginComponent }
]

@NgModule({
  // Código abaixo: importo para o routerModule as routes e depois exporto o RouterModule
  imports: [ RouterModule.forChild(routes) ], // .forRoot -> Configura o módulo globalmente no módulo raiz.
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  MessagesComponent,
  ToolbarComponent
]

const MODULES = [FlexLayoutModule, MaterialModule, RouterModule]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    MODULES,
    CommonModule
  ],
  exports: [
    COMPONENTS,
    MODULES,
    MaterialModule
  ]
})
export class CoreModule {
  //@Optional(): Essa anotação indica que o parâmetro parentModule pode ser opcional
  // @SkipSelf(): Essa anotação indica que, se o módulo pai for encontrado no módulo atual, ele deve ser ignorado
  //Verifica se o módulo já foi carregado anteriormente e, caso isso ocorra, lançar uma exceção.
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this Module in the AppModule');
    }
  }
}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

const COMPONENTS = [
  MessagesComponent,
  ToolbarComponent,
  PageNotFoundComponent,
  LoadingComponent,
  ConfirmationDialogComponent
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // Tipo do Provider
      useClass: LoadingInterceptor, // Classe Usada 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, // Tipo do Provider
      useClass: HttpErrorInterceptor, // Classe Usada 
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
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

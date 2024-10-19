import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  // Inicia activeRequests com 0
  private activeRequests = 0;

  // Loading inicia como false
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Caso não tenha nenhuma requisição Http irá mostrar o spinner do loading
    if (this.activeRequests == 0) {
      this.loadingService.show();
    }
    // Qualquer requisição Http feita irá incrementar o activeRequests.
    this.activeRequests++;

    // Continua a requisição
    return next.handle(request).pipe(
    // Ao terminar a requisição Http feita irá diminuir 1 no activeRequests.
      finalize( () => {
        this.activeRequests--;

        if (this.activeRequests == 0) {
          // Esconde o spinner do loading
          this.loadingService.hide()
        }
      })
    );
  }
}

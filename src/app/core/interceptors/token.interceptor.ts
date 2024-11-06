import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // localStorage -> área especifica do browser para salvar dados.
    // Busco um token no localStorage
    let token = localStorage.getItem('token') || ''; // Sempre que usar o mesmo browser, apontado para mesma url irá apontar para o token criado.

    // Valida se existe o token, se não tiver cria
    // if (!token) {
    //   token = this.generateToken();
    //   // Seta o token no localStorage
    //   localStorage.setItem('token', token);
    // }

    // clona a request e adiciona o Header Authorization como token
    request = request.clone({
      setHeaders: {
        Authorization: token
      }
    })

    return next.handle(request);
  }

  // private generateToken(): string {
  //   // Gerar um token
  //   return Math.random().toString(36).substring(2,12);
  // }
}

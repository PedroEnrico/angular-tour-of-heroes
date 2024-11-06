import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Credential } from '../models/credentials.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject: Pode ser atribuido um valor inicial - Pode ser alterado os valores - Pode ter varios lugares da aplicação observando seus valores.
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();
  constructor(private router: Router) { }

  login(credentials: Credential): void {
    // Seta o token no local storage com o valor do password
    localStorage.setItem('token', credentials.password);
    // Altero o valor do loggedIn
    this.updateLoggedIn();
    // Mando para a tela de dashboard
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    // .clear: Limpa tudo q esta no localStorage || removeItem: Limpa um item do localStorage.
    localStorage.clear();
    this.updateLoggedIn();
    this.router.navigate(['/login'])
  }

  updateLoggedIn():void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }
}

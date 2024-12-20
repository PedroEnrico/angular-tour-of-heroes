import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.updateLoggedIn();
    // Caso tenha token irá retornar true e entrar na rota
    if (localStorage.getItem('token')) {
      return true;
    } else { // Se não tiver retorna false e redireciona para o login
      this.router.navigate(['/login'])
      return false;
    }
  }

}

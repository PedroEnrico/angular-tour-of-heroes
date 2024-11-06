import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hero';
  menuItems: MenuItem[] = [
    {
      MatIcon: 'dashboard',
      routerLink: '/dashboard',
      toolTipText: 'Dashboard'
    },
    {
      fasIcon: 'mask',
      routerLink: '/heroes',
      toolTipText: 'Heroes'
    }
  ]
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    // o App está observando qualquer alteração que ocorrer no isLoggedIn do authService
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout(): void {
    this.authService.logout();
  }
}

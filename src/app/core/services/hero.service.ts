import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // Api Rest: Get - Obter Dados
  // Put/Patch - Alterar Dados
  // Post - Criar Dados
  // Delete - Excluir Dados

  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // GET /heroes
  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes => this.log(`fetched ${heroes.length} hero(es)`)))
    );
  }

  // GET /heroes/id
  getHero(id: number):Observable<Hero> {

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((hero) => this.log(`fetched hero id=${id} and name=${hero.name}`))
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

}

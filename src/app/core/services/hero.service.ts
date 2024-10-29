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
  getAll(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes => this.log(`fetched ${heroes.length} hero(es)`)))
    );
  }

  // GET /heroes/id
  getOne(id: number):Observable<Hero> {

    return this.http.get<Hero>(this.getUrl(id)).pipe(
      tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`))
    );
  }

  // PUT /heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.getUrl(hero.id), hero).pipe(
      tap((hero) => this.log(`Updated ${this.descAttributes(hero)}`))
    );
  }

  // GET /heroes?name=term     Na url o ? é para parametros, ex: ?name=term&age=19
  search(term: string): Observable<Hero[]> {
    if (!term.trim()) return of([]);

    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap((heroes) => 
        heroes.length ? this.log(`Found ${heroes.length} hero(es) matching "${term}"`) : this.log(`no heroes matching "${term}"`)
      )
    );
  }

  // POST /heroes
  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero) => this.log(`Created ${this.descAttributes(hero)}`))
    );
  }

  // DELETE /heroes/id
  delete(hero: Hero): Observable<any> {
    return this.http.delete<any>(this.getUrl(hero.id)).pipe(
      tap((hero) => this.log(`Deleted ${this.descAttributes(hero)}`))
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private descAttributes(hero: Hero): string {
    return ` hero id=${hero.id} and name=${hero.name}`;
  }

  private getUrl(id: number) {
    return `${this.heroesUrl}/${id}`;
  }
}

import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  displayedColumns: string[] = ['id', 'name']

  constructor(private heroService: HeroService) {} // Injeta o service;

  ngOnInit(): void { // Chama o metodo getHeroes;
    this.getHeroes();
  }

  getHeroes(): void { // Chama o metodo getHeroes do SERVICE. Retornando uma lista de hero;
   this.heroService.getHeroes().subscribe( // Quando deifinimos um retorno como Observable utilizamos o .subscribe para ser notificado quando ocorrer uma mudança no getHeroes;
    //Next: método é chamado para cada valor emitido pelo Observable.
   (heroes) => (this.heroes = heroes),
   // Error: método é chamado se ocorrer um erro durante a emissão.
   (err) => (console.log('Deu erro na emissão' + err)),
   // Complete: método é chamado quando o Observable completa de emitir todos valores sem erro.
   () => (console.log('Completou a emissão'))
    ); 
  }
}

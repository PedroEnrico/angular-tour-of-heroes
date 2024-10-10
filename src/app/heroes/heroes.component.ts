import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  constructor(private heroService: HeroService, private messageService: MessageService) {} // Injeta o service;

  ngOnInit(): void { // Chama o metodo getHeroes;
    this.getHeroes();
  }

  getHeroes(): void { // Chama o metodo getHeroes do SERVICE. Retornando uma lista de hero;
   this.heroService.getHeroes().subscribe( // Quando deifinimos um retorno como Observable utilizamos o .subscribe para ser notificado quando ocorrer uma mudança no getHeroes;
   (heroes) => (this.heroes = heroes),
   (err) => (console.log('Deu erro na emissão' + err)),
   () => (console.log('Completou a emissão'))
   
      //Next: método é chamado para cada valor emitido pelo Observable.
    //  (value) => { 
    //     console.log(value);
    //  },
      // Error: método é chamado se ocorrer um erro durante a emissão.
    //  (err) => {
    //     console.log(err);
    //  },
      // Complete: método é chamado quando o Observable completa de emitir todos valores sem erro.
    //  () => {
    //     console.log('Agora foi normalmente concluido');
    //  }
    ); 
  }
  
  onSelect(hero: Hero): void {
    
    this.selectedHero = hero; 
    this.messageService.add(`HeroesComponent: Selected Hero Id = ${hero.id}`);

  }
}

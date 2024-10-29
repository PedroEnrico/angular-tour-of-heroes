import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/hero.model';
import { HeroService } from 'src/app/core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  
  @Input()
  label: string = "";

  @Output() private selected = new EventEmitter<Hero>();

  private searchTerm = new Subject<string>();
  
  heroes$!: Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // Cada atualização no searchTerm, irá rodar o switchMap
    // this.heroes$ está no template com | async 
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(), // -> Apenas executa se o valor for diferente do que já está digitado.
      switchMap(term => this.heroService.search(term))
    );
  }

  search(term: string): void {
    // A origem dos dados será modificada a cada digitação no input
    this.searchTerm.next(term);
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void {
    this.searchTerm.next('');

    const hero: Hero = selectedItem.option.value;
    this.selected.emit(hero);
  }

}

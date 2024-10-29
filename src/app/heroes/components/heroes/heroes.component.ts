import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { MessageService } from '../../../core/services/message.service';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions']

  constructor(private heroService: HeroService, private dialog: MatDialog) {} // Injeta o service;

  ngOnInit(): void { // Chama o metodo getHeroes;
    this.getHeroes();
  }

  getHeroes(): void { // Chama o metodo getHeroes do SERVICE. Retornando uma lista de hero;
   this.heroService.getAll().subscribe( // Quando deifinimos um retorno como Observable utilizamos o .subscribe para ser notificado quando ocorrer uma mudança no getHeroes;
    //Next: método é chamado para cada valor emitido pelo Observable.
   (heroes) => (this.heroes = heroes),
   // Error: método é chamado se ocorrer um erro durante a emissão.
   (err) => (console.log('Deu erro na emissão' + err)),
   // Complete: método é chamado quando o Observable completa de emitir todos valores sem erro.
   () => (console.log('Completou a emissão'))
    ); 
  }

  delete(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      contentText: `Delete '${hero.name}'?`
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData, // Data que está no constructor do ConfirmationDialogComponent
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(r => {
      console.log(r)
      if (r) {
        this.heroService.delete(hero).subscribe(() => {
          // this.heroes = this.heroes.filter((h) => h != hero);
          this.getHeroes();
        })
      } 
    })

    
  }

  onSelected(hero: Hero): void {
    this.delete(hero);
  }
}

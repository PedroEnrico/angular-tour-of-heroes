import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "src/app/core/services/hero.service";
import { Hero } from "src/app/core/models/hero.model";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

    hero!:Hero;
    
    isEditing = false;
    form = this.fb.group({
        id: [{value: '', disabled: true}],
        name: ['', [Validators.required, Validators.minLength(3)]]
    })

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar, // Injetando MatSnackBar
        private heroService: HeroService, // Criar metoodo para buscar o Hero
        private location: Location, // Pacote para interagir com historico do browser
        private route: ActivatedRoute) { // Segura as informações do momento da rota
    }

    ngOnInit(): void {
        this.getHero();
    }

    getHero():void {
        const paramId = this.route.snapshot.paramMap.get('id') // Extrair um parâmetro específico da URL
        if (paramId != 'new') {
            this.isEditing = true;

            const id = Number(paramId); 
            this.heroService.getOne(id).subscribe(hero => {this.hero = hero 
                this.form.controls['id'].setValue(hero.id);
                this.form.controls['name'].setValue(hero.name);
            });
        }
    }

    goBack(): void {
        this.location.back(); // retorna para a página anterior
    }

    update(): void{
        console.log(this.form);

        const { valid, value} = this.form; //Irá pegar as propriedades valid e value e irá atribuir.

        if (valid) {

            const hero: Hero = {
                id: this.hero.id,
                name: value.name // value vem do form
            }

            this.heroService.update(hero).subscribe( () => this.goBack());
        } else {
            this.showErrorMsg();
        }
    }

    create(): void{
        console.log(this.form)

        const { valid, value} = this.form; //Irá pegar as propriedades valid e value e irá atribuir.

        if (valid) {

            const hero: Hero = {
                name: value.name,
            } as Hero; // Tranasforma em HERO
            
            this.heroService.create(hero).subscribe( () => this.goBack());
        } else {
            this.showErrorMsg();
        }
    }

    private showErrorMsg(): void {
        this.snackBar.open('Please check the error found.', "Ok", {
            duration: 3000, // duração em ms
            verticalPosition: 'top' // posição
        })
    } 
}
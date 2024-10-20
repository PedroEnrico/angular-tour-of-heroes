import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "src/app/core/services/hero.service";
import { Hero } from "src/app/core/models/hero.model";


@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

    hero!:Hero;

    constructor(
        private heroService: HeroService, // Criar metoodo para buscar o Hero
        private location: Location, // Pacote para interagir com historico do browser
        private route: ActivatedRoute) { // Segura as informações do momento da rota
    }

    ngOnInit(): void {
        this.getHero();
    }

    getHero():void {
        const id = Number(this.route.snapshot.paramMap.get('id')); // Extrair um parâmetro específico da URL
        this.heroService.getOne(id).subscribe(hero => this.hero = hero);
    }

    goBack(): void {
        this.location.back(); // retorna para a página anterior
    }

    isFormValid(): boolean {
        return !!this.hero.name.trim();
    }

    save(): void{
        this.heroService.update(this.hero).subscribe( () => this.goBack());
    }
}
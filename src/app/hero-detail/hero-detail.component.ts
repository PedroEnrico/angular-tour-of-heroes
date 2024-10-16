import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../hero.model";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";


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
        this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    }

    goBack(): void {
        this.location.back(); // retorna para a página anterior
    }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';



@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [
    CommonModule, 
    FormsModule,
    MaterialModule, 
    FlexLayoutModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }

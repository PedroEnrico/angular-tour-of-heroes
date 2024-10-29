import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [
    CommonModule, 
    MaterialModule, 
    FlexLayoutModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HeroesModule { }

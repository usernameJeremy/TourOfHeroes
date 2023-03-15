import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent {
  
  hero: Hero ={
    id: 1,
    name: 'Windstorm'
  }

  heroes = HEROES;

  selectedHero?: Hero;
  onSelect(hero:Hero): void {
    this.selectedHero = hero;
  }

}

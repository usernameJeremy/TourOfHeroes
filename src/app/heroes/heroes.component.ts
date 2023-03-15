import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit{

  selectedHero?: Hero;

  heroes: Hero[] = [];
  
//constructor injection mag enkel injectie bevatten
constructor(
  private heroService: HeroService,
  private messageService: MessageService,
){}


ngOnInit(): void {
  this.getHeroes();
}

  onSelect(hero:Hero): void {
    this.selectedHero = hero;
    //backticks en  ${} zorgt er voor dat je dynamische info kan laten zien in een string/message 
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }
//waits for the Observable to emit the array of heroes
// subscribe() method passes the emitted array to the callback, sets component's heroes property.
  getHeroes(): void {
    this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
  }

}

import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})


export class HeroDetailsComponent {
  //Add a hero property, preceded by the @Input() decorator.
  @Input() hero?: Hero;

}

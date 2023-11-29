import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gym-counter',
  templateUrl: './gym-counter.component.html',
  styleUrls: ['./gym-counter.component.scss']
})
export class GymCounterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  counter = [
    {
      count:'1510',
      img:'assets/images/gym/counter/happy-icon.png',
      type:'Exercices différents'
    },
    {
      count:'1510',
      img:'assets/images/gym/counter/project-icon.png',
      type:"Possibilité d'entrainement"
    },
    {
      count:'1510',
      img:'assets/images/gym/counter/work-icon.png',
      type:'Entrainements disponibles'
    },
    {
      count:'1510',
      img:'assets/images/gym/counter/award-icon.png',
      type:'Heures de travail'
    }]

}

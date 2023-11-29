import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
  path?: string;
  title: string;
  type?: string;
  icon?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor() {}

  MENUITEMS: Menu[] = [
    {
      path: '',
      title: 'Home',
      type: 'link'
    },
    {
      path: '/blog',
      title: 'Blog',
      type: 'link'
    },
    {
      path: '/exercises',
      title: 'Exercices',
      type: 'link'
    },
    {
      path: '/workouts',
      title: 'Entrainements',
      type: 'link'
    },
    {
      path: '/exercises',
      title: 'Exercices',
      type: 'link'
    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}

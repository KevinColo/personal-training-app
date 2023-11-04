import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public categories = [
    { name: 'Lorem Ipsum Is Simple' },
    { name: 'Many Variations' },
    // ... autres catégories
  ];

  public popularPosts = [
    {
      title: 'lorem ipsum',
      date: 'nov 22, 2020',
      imageSrc: 'assets/images/inner-page/side-img/1.jpg',
      badge: '2020',
    },
    // ... autres posts
  ];
  constructor() {}

  ngOnInit() {}
}

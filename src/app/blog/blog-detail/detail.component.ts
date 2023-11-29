import { Component, OnInit } from '@angular/core';
import { blogDetailDB } from '../../shared/data/blog/blog-detail/blog-detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  blogData: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadBlogData(this.route.snapshot.params['id']);
  }

  loadBlogData(id: string) {
    // Ici, vous chargeriez les données de blog basées sur l'id récupéré.
    // Ceci est un exemple et doit être adapté selon la façon dont vous récupérez les données.
    this.blogData = blogDetailDB.Details.find(detail => detail.id === Number(id));
  }
}

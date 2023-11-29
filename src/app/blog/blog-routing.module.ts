import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SplitRightSidebarComponent} from "./split-right-sidebar/split-right-sidebar.component";
import {DetailComponent} from "./blog-detail/detail.component";
import {BlogComponent} from "./blog.component";

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent, // BlogComponent agit comme un layout
    children: [
      {
        path: '', // Route par défaut pour /blog
        component: SplitRightSidebarComponent, // Affiche SplitRightSidebarComponent à la racine de /blog
      },
      {
        path: ':id', // Pour /blog/:id
        component: DetailComponent, // Affiche DetailComponent pour les routes avec un ID
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

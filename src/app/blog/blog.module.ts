import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar/sidebar.component';

import { DetailComponent } from './blog-detail/detail.component';
import { SplitRightSidebarComponent } from './split-right-sidebar/split-right-sidebar.component';
import { BlogRoutingModule } from './blog-routing.module';
import {BlogComponent} from "./blog.component";

@NgModule({
  declarations: [BlogComponent, SidebarComponent, SplitRightSidebarComponent, DetailComponent],
  exports: [SplitRightSidebarComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    NgxMasonryModule,
    CarouselModule,
    NgbModule,
    NgOptimizedImage,
  ],
})
export class BlogModule {}

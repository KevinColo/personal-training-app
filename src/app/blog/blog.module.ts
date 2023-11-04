import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar/sidebar.component';

import { DetailComponent } from './blog-detail/detail.component';
import { SplitRightSidebarComponent } from './split-right-sidebar/split-right-sidebar.component';

@NgModule({
  declarations: [SidebarComponent, SplitRightSidebarComponent, DetailComponent],
  exports: [SplitRightSidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxMasonryModule,
    CarouselModule,
    NgbModule,
    NgOptimizedImage,
  ],
})
export class BlogModule {}

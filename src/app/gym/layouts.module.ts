import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Gym Layout
import { GymComponent } from './gym.component';
import { GymNavComponent } from './gym-nav/gym-nav.component';
import { GymHeaderComponent } from './gym-header/gym-header.component';
import { GymAboutComponent } from './gym-about/gym-about.component';
import { GymScheduleComponent } from './gym-schedule/gym-schedule.component';
import { GymWorkoutAboutComponent } from './gym-workout-about/gym-workout-about.component';
import { GymCounterComponent } from './gym-counter/gym-counter.component';
import { GymTrainerComponent } from './gym-trainer/gym-trainer.component';
import { GymTestimonialComponent } from './gym-testimonial/gym-testimonial.component';
import { GymPricingComponent } from './gym-pricing/gym-pricing.component';
import { GymBMIComponent } from './gym-bmi/gym-bmi.component';
import { GymBrandComponent } from './gym-brand/gym-brand.component';
import { GymFooterComponent } from './gym-footer/gym-footer.component';
import { GymCopyrightComponent } from './gym-copyright/gym-copyright.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    GymComponent,
    GymNavComponent,
    GymHeaderComponent,
    GymAboutComponent,
    GymScheduleComponent,
    GymWorkoutAboutComponent,
    GymCounterComponent,
    GymTrainerComponent,
    GymTestimonialComponent,
    GymPricingComponent,
    GymBMIComponent,
    GymBrandComponent,
    GymFooterComponent,
    GymCopyrightComponent,
  ],

  imports: [
    CommonModule,
    LayoutsRoutingModule,
    CarouselModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Ng5SliderModule,
    NgxMasonryModule,
  ],
  exports: [GymNavComponent, GymHeaderComponent],
})
export class LayoutsModule {}

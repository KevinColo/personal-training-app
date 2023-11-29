import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ProgressComponent } from './progress/progress.component';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesService } from './exercises/exercises.service';
import { SecondsToTimePipe } from './pipes/SecondsToTimePipe';
import { WorkoutDetailsComponent } from './workouts/workout-details/workout-details.component';
import { HomeComponent } from './home/home.component';
import { WorkoutsService } from './workouts/workouts.service';
import { BlogModule } from './blog/blog.module';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './gym/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GymComponent } from './gym/gym.component';

const routes: Routes = [
  { path: '', component: GymComponent },
  {
    path: 'exercises',
    component: ExercisesComponent,
    children: [
      {
        path: ':id',
        component: ExercisesComponent,
      },
    ],
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    children: [
      {
        path: ':id',
        component: WorkoutDetailsComponent,
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'workout-builder', component: WorkoutsComponent },
  { path: 'progress', component: ProgressComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ExercisesComponent,
    WorkoutsComponent,
    ProgressComponent,
    SecondsToTimePipe,
    WorkoutDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BlogModule,
    DragDropModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    SharedModule,
    LayoutsModule,
  ],
  providers: [ExercisesService, WorkoutsService],
  bootstrap: [AppComponent],
})
export class AppModule {}

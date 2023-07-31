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
import {
  RouterLink,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { ExercisesService } from './exercises/exercises.service';
import { SecondsToTimePipe } from './pipes/SecondsToTimePipe';
import { WorkoutDetailsComponent } from './workouts/workout-details/workout-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'workout-builder', component: WorkoutsComponent },
  { path: 'workouts/:id', component: WorkoutDetailsComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'progress', component: ProgressComponent },
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
    DragDropModule,
    RouterModule.forRoot(routes),
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ExercisesService],
  bootstrap: [AppComponent],
})
export class AppModule {}

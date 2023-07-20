import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ProgressComponent } from './progress/progress.component';
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {ExercisesService} from "./exercises/exercises.service";
import {HttpClientModule} from "@angular/common/http";
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'workout-builder', component: WorkoutsComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'progress', component: ProgressComponent },
  //{ path: 'workouts/:id', component: WorkoutDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ExercisesComponent,
    WorkoutsComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    RouterModule.forRoot(routes),
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    FormsModule
  ],
  providers: [ExercisesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

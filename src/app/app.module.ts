import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { ProgressComponent } from './components/progress/progress.component';
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";

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
    RouterModule.forRoot(routes), // Assurez-vous d'importer RouterModule et de le configurer ici
    RouterOutlet,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

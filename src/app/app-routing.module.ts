import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'progress', component: ProgressComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

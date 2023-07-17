import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { ProgressComponent } from './components/progress/progress.component';

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

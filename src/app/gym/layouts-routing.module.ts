import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GymComponent } from './gym.component';

const routes: Routes = [
  {
    path: 'gym',
    component: GymComponent,
    data: {
      title: "Gym | Unice Landing Page"
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }

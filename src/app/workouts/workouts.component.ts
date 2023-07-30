import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from './workouts.service';
import { Workout } from './workout.model';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  constructor(private workoutsService: WorkoutsService) {}

  ngOnInit() {
    this.workoutsService.getWorkouts().subscribe((data) => {
      this.workouts = data;
    });
  }
}

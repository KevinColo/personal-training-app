import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutsService } from '../workouts.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css'],
})
export class WorkoutDetailsComponent implements OnInit {
  workout: Workout;

  constructor(
    private route: ActivatedRoute,
    private workoutsService: WorkoutsService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutsService.getWorkout(id).subscribe((workout) => {
        this.workout = workout;
      });
    }
  }
}

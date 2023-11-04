import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from './workouts.service';
import { Workout } from './workout.model';
import { ExercisesService } from '../exercises/exercises.service';
import { Exercise } from '../exercises/exercise.model';

interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  exercises: Exercise[] = [];
  workoutsWithExercises: WorkoutWithExercises[] = [];
  constructor(
    private workoutsService: WorkoutsService,
    private exercisesService: ExercisesService
  ) {}

  ngOnInit() {
    this.workoutsService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
      workouts.map(workout => {
        this.exercisesService
          .getSomeExercises(workout.exercisesId)
          .subscribe(exercises => {
            this.workoutsWithExercises.push({
              ...workout,
              exercises: exercises,
            });
          });
      });
    });
  }
}

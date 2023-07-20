import { Component, OnInit } from '@angular/core';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  filter = '';
  allExercises: Exercise[];
  exercises: Exercise[] = [];
  futureWorkout: Exercise[] = [];

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((data) => {
      this.exercises = data;
      this.allExercises = data;
    });
  }

  applyFilter() {
    if (this.filter) {
      this.exercises = this.allExercises.filter((exercise) => {
        return exercise.name.toLowerCase().includes(this.filter);
      });
    } else {
      this.exercises = this.allExercises;
    }
  }

  drop(event: CdkDragDrop<Exercise[]>) {
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

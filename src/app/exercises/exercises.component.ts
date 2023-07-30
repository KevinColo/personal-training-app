import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  duration: number = 480;
  difficultyLevel = 1; // 1 = Easy, 2 = Medium, 3 = High
  difficulty = 'Easy' // Ajoutez cette ligne


  constructor(private exercisesService: ExercisesService, private router: Router) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((data) => {
      this.exercises = data;
      this.allExercises = data;
    });
  }

  applyFilter() {
    if (this.filter) {
      this.exercises = this.allExercises.filter((exercise) => {
          return exercise.name.toLowerCase().includes(this.filter.toLowerCase());
        }
      );
    } else {
      this.exercises = this.allExercises;
    }
  }


  drop(event: CdkDragDrop<Exercise[]>) {
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

  getDifficulty(level: number): string {
    switch (level) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      default:
        return 'Medium';
    }
  }

  createWorkout() {
    // convert difficultyLevel to string
    let difficulty;
    switch (this.difficultyLevel) {
      case 1:
        difficulty = 'Easy';
        break;
      case 2:
        difficulty = 'Medium';
        break;
      case 3:
        difficulty = 'High';
        break;
      default:
        difficulty = 'Medium';
        break;
    }
    this.exercisesService
      .createWorkout(this.futureWorkout, this.duration, difficulty)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/workouts', response.id]);
      });

  }

  onDurationChange(event: any) {
    this.duration = event;
    // Your logic here
  }

  onDifficultyChange(event: any) {
    this.difficultyLevel = event;
    this.difficulty = this.getDifficulty(this.difficultyLevel);
  }
}

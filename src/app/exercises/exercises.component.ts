import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.model';
import { MuscleGroupsEnum } from './muscle-groups.enum';
import { ExerciseDifficultyEnum } from './exercise-difficulty.enum';

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
  duration = 480;
  difficultyLevel = 1; // 1 = Easy, 2 = Medium, 3 = High
  difficulty = 'Easy';
  muscleGroupsEnum = MuscleGroupsEnum;
  selectedMuscleGroups: { [key: string]: boolean } = {};
  exerciseDifficulty = ExerciseDifficultyEnum;
  selectedDifficulty: { [key: string]: boolean } = {};

  constructor(
    private exercisesService: ExercisesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe(data => {
      this.exercises = data;
      this.allExercises = data;
    });
  }

  applyFilter() {
    let filteredExercises = this.allExercises;

    // Filtrer par nom si un filtre de nom est défini
    if (this.filter) {
      filteredExercises = filteredExercises.filter(exercise => {
        return exercise.name.toLowerCase().includes(this.filter.toLowerCase());
      });
    }

    // Filtrer par groupe musculaire si un groupe musculaire est sélectionné
    const selectedGroups = Object.keys(this.selectedMuscleGroups).filter(
      key => this.selectedMuscleGroups[key]
    );
    if (selectedGroups.length > 0) {
      filteredExercises = filteredExercises.filter(exercise => {
        return selectedGroups.includes(exercise.muscleGroup);
      });
    }

    // Filtrer par difficulté si une difficulté est sélectionnée
    const selectedDifficulties = Object.keys(this.selectedDifficulty).filter(
      key => this.selectedDifficulty[key]
    );
    if (selectedDifficulties.length > 0) {
      filteredExercises = filteredExercises.filter(exercise => {
        return selectedDifficulties.includes(exercise.difficulty);
      });
    }

    this.exercises = filteredExercises;
  }

  drop(event: CdkDragDrop<Exercise[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
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
      .subscribe(response => {
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

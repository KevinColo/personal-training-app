import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { WorkoutsService } from '../workouts.service';
import { Workout } from '../workout.model';
import { ExercisesService } from '../../exercises/exercises.service';
import { Exercise } from '../../exercises/exercise.model';
import { WorkoutTemplate } from '../workout-template.model';
import { ProgressItem } from './progress-item';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css'],
})
export class WorkoutDetailsComponent implements OnInit, OnDestroy {
  public workout: Workout;
  public exercises: Exercise[];
  public isLoading = true;
  public workoutTemplate: WorkoutTemplate;
  currentExerciseIndex = 0;
  globalTimer = 0;
  exerciseTimer = 0;
  restTime = 0;
  showPlayButton = true;
  isRunning = false;
  exerciseTimerSubscription: Subscription;
  restTimerSubscription: Subscription;
  currentRound = 1;
  progressBar: ProgressItem[] = [];
  isResting = false;
  video = 'ready.gif';

  constructor(
    private route: ActivatedRoute,
    private workoutsService: WorkoutsService,
    private exercisesService: ExercisesService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.workoutsService.getWorkout(id).subscribe((workout: Workout) => {
        this.exercisesService
          .getSomeExercises(workout.exercisesId)
          .subscribe((exercises) => {
            this.workout = workout;
            this.globalTimer = workout.duration;
            this.exerciseTimer = workout.workoutTemplate.workTime;
            this.workoutTemplate = workout.workoutTemplate;
            this.exercises = exercises;
            this.buildCurrentRoundProgressBar();
            this.isLoading = false;
          });
      });
    }
  }

  // Démarrage du workout
  startWorkout() {
    this.showPlayButton = false;
    this.isRunning = true;
    this.startExerciseTimer();
    this.startGlobalTimer();
  }

  buildCurrentRoundProgressBar() {
    this.progressBar = [];
    const numExercises = this.workout.workoutTemplate.numExercisesRound;
    const hasRestBetweenExercises = this.workout.workoutTemplate.restTime > 0;

    for (let i = 0; i < numExercises; i++) {
      this.progressBar.push({
        duration: this.workout.workoutTemplate.workTime,
        isActive: false,
        isCompleted: false,
        isRest: false,
        videoId: this.workout.exercisesId[this.currentRound - 1][i],
      });

      if (hasRestBetweenExercises && i < numExercises - 1) {
        this.progressBar.push({
          duration: this.workout.workoutTemplate.restTime,
          isActive: false,
          isCompleted: false,
          isRest: true,
        });
      }
    }
  }

  startExerciseTimer() {
    this.exerciseTimer = this.workout.workoutTemplate.workTime;
    if (this.progressBar[this.currentExerciseIndex].videoId) {
      this.video = this.getVideoUrlById(this.progressBar[this.currentExerciseIndex].videoId)
    }
    this.exerciseTimerSubscription = interval(1000).subscribe(() => {
      this.exerciseTimer--;
      if (this.exerciseTimer <= 0 && this.exerciseTimerSubscription) {
        this.exerciseTimerSubscription.unsubscribe();
        this.currentExerciseIndex++;
        this.moveToNextExerciseOrRest();
      }
    });
  }

  moveToNextExerciseOrRest() {
    if (this.currentExerciseIndex < this.progressBar.length) {
      const currentItem = this.progressBar[this.currentExerciseIndex];
      currentItem.isActive = true;
      if (currentItem.videoId) {
        this.getVideoUrlById(currentItem.videoId)
      }
      if (currentItem.isRest) {
        this.isResting = true;
        this.startRestTimer(currentItem.duration);
      } else {
        this.isResting = false;
        this.startExerciseTimer();
      }
    } else {
      // Si tous les exercices sont terminés
      this.startRestBetweenRounds();
    }
  }
  startGlobalTimer() {
    interval(1000).subscribe(() => {
      this.globalTimer--;
    });
  }

  startRestTimer(duration: number) {
    this.exerciseTimer = duration;
    this.exerciseTimerSubscription = interval(1000).subscribe(() => {
      this.exerciseTimer--;
      if (this.exerciseTimer <= 0) {
        this.exerciseTimerSubscription.unsubscribe();
        this.currentExerciseIndex++;
        this.moveToNextExerciseOrRest();
      }
    });
  }

  startRestBetweenRounds() {
    // Commencer le repos entre les rounds
    this.isResting = true;
    this.currentRound++;
    this.restTime = this.workout.workoutTemplate.restBetweenRounds;
    this.restTimerSubscription = interval(1000).subscribe(() => {
      this.restTime--;
      if (this.restTime <= 0) {
        this.restTimerSubscription.unsubscribe();
        this.isResting = false;
        // Réinitialiser l'index de l'exercice pour le nouveau round
        this.currentExerciseIndex = 0;
        this.buildCurrentRoundProgressBar();
        this.startExerciseTimer();
      }
    });
  }

  get globalTimerInMinutes(): string {
    return Math.floor(this.globalTimer / 60) + ' min';
  }

  public getVideoUrlById(id: number | undefined): string {
    const exercise = this.exercises.find(e => e.id === id);
    return exercise ? exercise.videoUrl : '';
  }

  ngOnDestroy() {
    if (this.exerciseTimerSubscription) {
      this.exerciseTimerSubscription.unsubscribe();
    }
    if (this.restTimerSubscription) {
      this.restTimerSubscription.unsubscribe();
    }
  }
}

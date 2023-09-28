import { Component, OnInit } from '@angular/core';
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
export class WorkoutDetailsComponent implements OnInit {
  public workout: Workout;
  public exercises: Exercise[];
  public isLoading = true;
  public workoutTemplate: WorkoutTemplate;
  currentExerciseIndex = 0;
  currentExerciseId = 0;
  globalTimer = 0;
  globalTimerSubscription: Subscription;
  unifiedTimer = 0;
  unifiedTimerSubscription: Subscription;
  isRestPeriod = false;
  restTime = 0;
  showPlayButton = true;
  isRunning = false;
  currentRound = 1;
  currentRoundProgressBar: ProgressItem[] = [];
  isResting = false;
  video = 'ready.gif';

  constructor(
    private route: ActivatedRoute,
    private workoutsService: WorkoutsService,
    private exercisesService: ExercisesService,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.workoutsService.getWorkout(id).subscribe((workout: Workout) => {
        this.exercisesService
          .getSomeExercises(workout.exercisesId)
          .subscribe((exercises) => {
            this.workout = workout;
            this.globalTimer = workout.duration;
            this.unifiedTimer = workout.workoutTemplate.workTime;
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
    this.startTimer();
    this.startGlobalTimer();
  }

  buildCurrentRoundProgressBar() {
    this.currentRoundProgressBar = [];
    const numExercisesRound = this.workout.workoutTemplate.numExercisesRound;
    const restTime = this.workout.workoutTemplate.restTime;
    const currentRoundExercises =
      this.workout.exercisesId[this.currentRound - 1];

    if (currentRoundExercises) {
      for (let i = 0; i < numExercisesRound; i++) {
        // Ajouter l'exercice
        this.currentRoundProgressBar.push({
          type: currentRoundExercises[i],
          duration: this.workout.workoutTemplate.workTime,
          isActive: false,
          isCompleted: false,
        });

        // Ajouter un temps de repos si nécessaire, sauf après le dernier exercice
        if (restTime > 0 && i < numExercisesRound - 1) {
          this.currentRoundProgressBar.push({
            type: 0,
            duration: restTime,
            isActive: false,
            isCompleted: false,
          });
        }
      }
    }
  }

  get globalTimerInMinutes(): string {
    return Math.floor(this.globalTimer / 60) + ' min';
  }

  public getVideoUrlById(id: number): string {
    const exercise = this.exercises.find((e) => e.id === id);
    return exercise ? exercise.videoUrl : '';
  }

  getExerciseById(id: number) {
    return this.exercises.find((exercise) => exercise.id === id);
  }


  startGlobalTimer(): void {
    if (this.globalTimerSubscription) {
      this.globalTimerSubscription.unsubscribe();
    }
    this.globalTimerSubscription = interval(1000).subscribe(() => {
      this.globalTimer--;
      if (this.globalTimer <= 0 && this.globalTimerSubscription) {
        this.globalTimerSubscription.unsubscribe();
      }
    });
  }


  startTimer(): void {
    if (this.unifiedTimerSubscription) {
      this.unifiedTimerSubscription.unsubscribe();
    }
    this.video = this.getVideoUrlById(this.currentRoundProgressBar[this.currentExerciseIndex].type)
    this.currentRoundProgressBar[this.currentExerciseIndex].isActive = true;
    this.unifiedTimerSubscription = interval(1000).subscribe(() => {
      if (this.unifiedTimer > 0) {
        this.unifiedTimer--;
      }

      // Logique pour gérer le changement d'exercice ou de période de repos
      if (this.unifiedTimer <= 0) {
        const progressBarItem = this.currentRoundProgressBar[this.currentExerciseIndex];
        progressBarItem.isCompleted = true;

        // Passer à l'élément suivant de la barre de progression
        this.currentExerciseIndex++;
        if (this.currentExerciseIndex < this.currentRoundProgressBar.length) {
          const nextProgressBarItem = this.currentRoundProgressBar[this.currentExerciseIndex];
          nextProgressBarItem.isActive = true;
          this.unifiedTimer = nextProgressBarItem.duration;
          // Mettre à jour la variable isResting en fonction de l'élément actif de la barre de progression
          this.isResting = nextProgressBarItem.type === 0;
          this.video = nextProgressBarItem.type > 0 ? this.getVideoUrlById(nextProgressBarItem.type) : '';
        } else {
          // Tous les éléments de la barre de progression sont terminés
          if (this.currentRound < this.workout.workoutTemplate.numRounds) {
            // Si ce n'est pas le dernier tour, initier le repos entre les tours
            this.isRestPeriod = true;
            this.video = '';
            this.unifiedTimer = this.workout.workoutTemplate.restBetweenRounds;
            this.currentRound++;
            this.buildCurrentRoundProgressBar();
            this.currentExerciseIndex = 0;
          } else {
            // Si c'est le dernier tour, terminer l'entraînement
            this.video = 'end.gif';
            if (this.unifiedTimerSubscription) {
              this.unifiedTimerSubscription.unsubscribe();
            }
            if (this.globalTimerSubscription) {
              this.globalTimerSubscription.unsubscribe();
            }
            return;
          }
        }
      }
    });
  }
}

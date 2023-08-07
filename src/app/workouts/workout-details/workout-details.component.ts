import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutsService } from '../workouts.service';
import { Workout } from '../workout.model';
import { ExercisesService } from '../../exercises/exercises.service';
import { Exercise } from '../../exercises/exercise.model';
import { WorkoutTemplate } from '../workout-template.model';
import { interval, Subscription, takeWhile } from 'rxjs';

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
  isResting = false;
  globalTimer = 0;
  exerciseTimer = 0;
  restTime = 0;
  showPlayButton = true;
  isRunning = false;
  timerSubscription?: Subscription;
  workoutProgress: any[] = [];

  leftTimerOffset: number = 157; // Pour animer le cercle gauche
  rightTimerOffset: number = 157; // Pour animer le cercle droit

  constructor(
    private route: ActivatedRoute,
    private workoutsService: WorkoutsService,
    private exercisesService: ExercisesService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutsService.getWorkout(id).subscribe((workout: Workout) => {
        console.log(workout);
        this.exercisesService
          .getSomeExercises(workout.exercisesId)
          .subscribe((exercises) => {
            this.workout = workout;
            this.globalTimer = workout.duration;
            this.exerciseTimer = workout.workoutTemplate.workTime;
            this.workoutTemplate = workout.workoutTemplate;
            this.exercises = exercises;
            this.createWorkoutProgressArray();
            this.isLoading = false;
          });
      });
    }
  }

  // Démarrage du workout
  startWorkout() {
    this.showPlayButton = false;
    this.isRunning = true;
    this.startExerciseTimer(
      this.workoutProgress[this.currentExerciseIndex].duration,
    );
    this.startGlobalTimer();
  }

  createWorkoutProgressArray() {
    const workoutTemplate = this.workout.workoutTemplate;
    for (let i = 0; i < workoutTemplate.numRounds; i++) {
      for (let j = 0; j < workoutTemplate.numExercisesRound; j++) {
        // Ajoutez chaque exercice
        this.workoutProgress.push({
          type: 'exercise',
          duration: workoutTemplate.workTime,
        });
        // Ajoutez du temps de repos après chaque exercice, sauf le dernier
        if (j < workoutTemplate.numExercisesRound - 1) {
          this.workoutProgress.push({
            type: 'rest',
            duration: workoutTemplate.restTime,
          });
        }
      }
      // Ajoutez du repos entre les tours, sauf après le dernier tour
      if (i < workoutTemplate.numRounds - 1) {
        this.workoutProgress.push({
          type: 'restBetweenRounds',
          duration: workoutTemplate.restBetweenRounds,
        });
      }
    }
  }

  startExerciseTimer(duration: number) {
    this.exerciseTimer = duration;
    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.exerciseTimer > 0))
      .subscribe(() => {
        this.exerciseTimer--;
        if (this.exerciseTimer === 0) {
          this.moveToNextExerciseOrRest();
        }
      });
  }

  startGlobalTimer() {
    interval(1000).subscribe(() => {
      this.globalTimer++;
    });
  }

  moveToNextExerciseOrRest() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    const nextProgressItem =
      this.workoutProgress[this.currentExerciseIndex + 1];

    if (nextProgressItem) {
      if (nextProgressItem.type === 'exercise') {
        // Wait 3 seconds before starting the new exercise
        setTimeout(() => {
          this.currentExerciseIndex++;
          this.startExerciseTimer(nextProgressItem.duration);
        }, 3000);
      } else if (
        nextProgressItem.type === 'rest' ||
        nextProgressItem.type === 'restBetweenRounds'
      ) {
        // Replace the GIF with a rest timer
        this.isResting = true;
        this.currentExerciseIndex++;
        this.startRestTimer(nextProgressItem.duration);
      }
    } else {
      // End of workout
    }
  }

  private startRestTimer(duration: number) {
    this.restTime = duration;
    // Logic to handle rest timer countdown
  }

  get globalTimerInMinutes(): string {
    return Math.floor(this.globalTimer / 60) + ' min';
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}

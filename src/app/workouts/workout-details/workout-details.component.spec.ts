import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { from, of } from 'rxjs';

import { WorkoutDetailsComponent } from './workout-details.component';
import { WorkoutsService } from '../workouts.service';
import { ExercisesService } from '../../exercises/exercises.service';
import {
  exercisesWithoutRestTime,
  exercisesWithRestTime,
} from '../../../mocks/workouts-mocks';
import { twoExercises } from '../../../mocks/exercises-mocks';
import { WorkoutsMockedService } from '../../../mocks/workouts-mocked.service';
import { ExercisesMockedService } from '../../../mocks/exercises-mocked.service';

describe('WorkoutDetailsComponent', () => {
  let component: WorkoutDetailsComponent;
  let fixture: ComponentFixture<WorkoutDetailsComponent>;
  let workoutService: WorkoutsService;
  let exerciseService: ExercisesService;
  const exercise = {
    duration: 15,
    isActive: false,
    isCompleted: false,
    isRest: false,
    type: 'exercise',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{ id: 1 }]),
            snapshot: { params: { id: '20' } },
          },
        },
        {
          provide: WorkoutsService,
          useClass: WorkoutsMockedService,
        },
        {
          provide: ExercisesService,
          useClass: ExercisesMockedService,
        },
      ],
    });
    fixture = TestBed.createComponent(WorkoutDetailsComponent);
    workoutService = TestBed.inject(WorkoutsService);
    exerciseService = TestBed.inject(ExercisesService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buildCurrentRoundProgressBar', () => {
    it('should create progressbar for the workout with RestIme', (done) => {
      jest
        .spyOn(workoutService, 'getWorkout')
        .mockImplementation(() => of(exercisesWithRestTime));
      jest
        .spyOn(exerciseService, 'getSomeExercises')
        .mockImplementation(() => of(twoExercises));
      fixture.detectChanges();
      component.buildCurrentRoundProgressBar();
      const rest = {
        duration: 15,
        isActive: false,
        isCompleted: false,
        isRest: true,
        type: 'rest',
      };
      expect(component.progressBar).toEqual([
        exercise,
        rest,
        exercise,
        rest,
        exercise,
        rest,
      ]);
      done();
    });

    it('should create progressbar for the workout without RestIme', (done) => {
      jest
        .spyOn(workoutService, 'getWorkout')
        .mockImplementation(() => of(exercisesWithoutRestTime));
      jest
        .spyOn(exerciseService, 'getSomeExercises')
        .mockImplementation(() => of(twoExercises));
      fixture.detectChanges();
      component.buildCurrentRoundProgressBar();
      expect(component.progressBar).toEqual([
        exercise,
        exercise,
        exercise,
        exercise,
        exercise,
        exercise,
      ]);
      done();
    });
  });

  describe('buildCurrentRoundProgressBar', () => {
    it('should start the workout', fakeAsync(() => {
      jest
        .spyOn(workoutService, 'getWorkout')
        .mockImplementation(() => of(exercisesWithRestTime));
      jest
        .spyOn(exerciseService, 'getSomeExercises')
        .mockImplementation(() => of(twoExercises));
      fixture.detectChanges();

      // Exécutez la méthode
      component.startWorkout();

      // Vérifiez que le bouton de lecture est caché
      expect(component.showPlayButton).toBe(false);

      // Simulez le passage du temps
      tick(1000);

      // Vérifiez que le timer global a bien décrémenté
      expect(component.globalTimer).toBe(component.workout.duration - 1);

      // Vérifiez que le timer de l'exercice a bien décrémenté
      expect(component.exerciseTimer).toBe(component.workout.workoutTemplate.workTime - 1);
      discardPeriodicTasks();
    }));
  });


});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.model';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExercisesService],
    });
    service = TestBed.inject(ExercisesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get exercises with filters', () => {
    const muscleGroup = 'Chest';
    const intensity = 'High';
    const difficulty = 'Medium';
    const expectedExercises: Exercise[] = [
      // Mock exercises data
    ];

    service
      .getExercises(muscleGroup, intensity, difficulty)
      .subscribe(exercises => {
        expect(exercises).toEqual(expectedExercises);
      });

    const req = httpTestingController.expectOne(req => {
      return (
        req.url === 'http://localhost:3000/exercises' &&
        req.params.has('muscleGroup') &&
        req.params.has('intensity') &&
        req.params.has('difficulty')
      );
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('muscleGroup')).toEqual(muscleGroup);
    expect(req.request.params.get('intensity')).toEqual(intensity);
    expect(req.request.params.get('difficulty')).toEqual(difficulty);

    req.flush(expectedExercises);
  });

  it('should create an exercise', () => {
    const exercise: Exercise = {
      // Mock exercise data
    } as Exercise;
    const expectedExercise: Exercise = {
      // Mock exercise data
    } as Exercise;

    service.createExercise(exercise).subscribe(createdExercise => {
      expect(createdExercise).toEqual(expectedExercise);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/exercises'
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(exercise);

    req.flush(expectedExercise);
  });

  it('should delete an exercise', () => {
    const id = 123;

    service.deleteExercise(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/exercises/${id}`
    );
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let exercisesService: ExercisesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExercisesComponent],
      providers: [
        { provide: ExercisesService, useValue: { getExercises: () => of([]) } },
      ],
      imports: [FormsModule, DragDropModule],
    }).compileComponents();

    exercisesService = TestBed.inject(ExercisesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    component.exercises = [] /* Initialise with test data */;
    component.futureWorkout = [] /* Initialise with test data */;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getExercises on init', () => {
    jest.spyOn(exercisesService, 'getExercises');
    component.ngOnInit();
    expect(exercisesService.getExercises).toHaveBeenCalled();
  });
});

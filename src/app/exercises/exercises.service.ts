import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Exercise } from './exercise.model';

@Injectable()
export class ExercisesService {
  private readonly API_URL = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) {}

  public getExercises(
    muscleGroup?: string,
    intensity?: string,
    difficulty?: string,
  ): Observable<Exercise[]> {
    const params: any = {};
    if (muscleGroup) params.muscleGroup = muscleGroup;
    if (intensity) params.intensity = intensity;
    if (difficulty) params.difficulty = difficulty;

    return this.http.get<Exercise[]>(this.API_URL, { params });
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.API_URL, exercise);
  }

  deleteExercise(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url);
  }
  createWorkout(futureWorkout: Exercise[], duration: number, difficulty: string): Observable<any> {
    const selectedExercises = futureWorkout.map(exercise => exercise.id);
    const workout = {
      exercisesId: selectedExercises,
      duration: duration,
      difficulty: difficulty
    };
    return this.http.post('http://localhost:3000/workouts', workout);
  }

}

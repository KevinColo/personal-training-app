import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from './workout.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkoutsService {
  private readonly API_URL = 'http://localhost:3000/workouts';

  constructor(private http: HttpClient) {}

  public getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.API_URL);
  }
  public getWorkout(id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.API_URL}/${id}`);
  }
}

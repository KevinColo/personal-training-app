import {WorkoutTemplate} from "./workout-template.model";

export class Workout {
   public id: number;
   public name: string;
   public description: string;
   public duration: number;
   public exercisesId: number[][];
   public workoutTemplate: WorkoutTemplate;
   public intensity: string;
}

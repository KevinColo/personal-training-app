import {Workout} from "../app/workouts/workout.model";

export const exercisesWithRestTime = {
  id: 20,
  name: 'userPreferences',
  duration: 480,
  description: 'toto',
  intensity: 'High',
  exercisesId: [
    [1, 5, 1],
    [1, 5, 1],
    [1, 5, 1],
    [1, 5, 1],
    [1, 5, 1],
    [1, 5, 1],
  ],
  workoutTemplate: {
    id: 6,
    name: 'Medium training',
    description: 'test',
    numRounds: 6,
    workTime: 15,
    intensity: 'Medium',
    restTime: 15,
    numExercisesRound: 3,
    restBetweenRounds: 30,
  },
};

export const exercisesWithoutRestTime: Workout = {
  id: 10,
  name: 'userPreferences',
  duration: 480,
  description: 'toto',
  intensity: 'High',
  exercisesId: [
    [1, 5, 1, 1, 5, 1],
    [1, 5, 1, 1, 5, 1],
    [1, 5, 1, 1, 5, 1],
    [1, 5, 1, 1, 5, 1],
    [1, 5, 1, 1, 5, 1],
    [1, 5, 1, 1, 5, 1],
  ],
  workoutTemplate: {
    id: 6,
    name: 'Medium training',
    description: 'test',
    numRounds: 6,
    workTime: 15,
    intensity: 'Medium',
    restTime: 0,
    numExercisesRound: 3,
    restBetweenRounds: 30,
  },
};


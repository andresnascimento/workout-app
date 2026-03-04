import { getJSON } from "./helper";
import { workoutURL } from "./config";

export const state = {
  workouts: [],
  latestWorkout: "",
};

export const setLatestWorkout = function (workout) {
  state.latestWorkout = workout;
  localStorage.setItem("latestWorkout", workout);
};

export const fetchWorkoutPlan = async function () {
  try {
    const workoutStorage = localStorage.getItem("workoutPlan");
    const latestWorkoutStorage = localStorage.getItem("latestWorkout");

    // check local storage for latest workout
    if (latestWorkoutStorage) state.latestWorkout = latestWorkoutStorage;

    // check storage for workouts
    if (workoutStorage) {
      state.workouts = JSON.parse(workoutStorage);
      return;
    }

    // fetch raw data
    const rawData = await getJSON(workoutURL);
    // get keys and values from rawData
    const objKeys = rawData.values[0];
    const objValues = rawData.values.slice(1);

    // create an array with workout objects
    const workoutObjArr = objValues.map((value) =>
      Object.fromEntries(objKeys.map((key, i) => [key, value[i]])),
    );

    // group the objects by workout type
    const workoutPlan = Object.values(
      Object.groupBy(workoutObjArr, (item) => item.workout),
    );
    state.workouts = workoutPlan;
    localStorage.setItem("workoutPlan", JSON.stringify(workoutPlan));

    //return workoutPlan;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

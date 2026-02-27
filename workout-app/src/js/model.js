import { getJSON } from "./helper";
import { workoutURL } from "./config";

export const state = {
  workouts: [],
  selectedWorkout: null,
};

export const fetchWorkoutPlan = async function () {
  try {
    // check if there is data on local storage
    const storage = sessionStorage.getItem("workoutPlan");

    if (storage) {
      state.workouts = JSON.parse(storage);
      return;
    }

    // fetch raw data
    const rawData = await getJSON(workoutURL);
    console.log("fetched data");
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
    sessionStorage.setItem("workoutPlan", JSON.stringify(workoutPlan));
    //return workoutPlan;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

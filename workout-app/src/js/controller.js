import * as model from "./model";
import workoutListView from "./views/workoutListView";
import workout from "./api/workouts.js";

const controlWorkoutList = async function () {
  try {
    const workoutSup = await workout.getWorkoutData();
    console.log(workoutSup);

    workoutListView.render(workoutSup);
    workoutListView.addWorkoutSelectHandler();
  } catch (error) {
    console.error("Controller error:", error);
  }
};

async function init() {
  workoutListView.setCurrentDate();
  controlWorkoutList();
  // workoutListView.setCurrentDate();
}

init();

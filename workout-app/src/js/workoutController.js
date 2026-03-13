import workoutView from "./views/workoutView.js";
import workout from "./api/workouts.js";

const controlWorkoutList = async function () {
  try {
    workoutView.renderSpinner();
    const workoutData = await workout.getWorkoutData();
    workoutView.render(workoutData);
    workoutView.addWorkoutSelectHandler();
  } catch (error) {
    console.error("Controller error:", error);
  }
};

async function init() {
  workoutView.setCurrentDate();
  controlWorkoutList();
  // workoutListView.setCurrentDate();
}

init();

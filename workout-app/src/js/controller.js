import * as model from "./model";
import workoutListView from "./views/workoutListView";

const controlWorkoutList = async function () {
  // if local storage is empty, fetch from API
  await model.fetchWorkoutPlan();
  const workoutData = model.state.workouts;
  console.log("workout data:", workoutData);

  // render list
  workoutListView.render(workoutData);
};

const init = function () {
  controlWorkoutList();
};

init();

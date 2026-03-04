import * as model from "./model";
import workoutListView from "./views/workoutListView";

const controlWorkoutList = async function () {
  // if local storage is empty, fetch from API
  await model.fetchWorkoutPlan();
  const workoutData = model.state.workouts;
  const latestWorkout = model.state.latestWorkout;
  const orderedData = workoutListView._rotateWorkout(
    workoutData,
    latestWorkout,
  );
  // console.log(latestWorkout);
  // console.log("workout data:", workoutData);

  // render list
  workoutListView.render(orderedData, latestWorkout);
  workoutListView.addWorkoutSelectHandler();
};

const init = function () {
  controlWorkoutList();
  workoutListView.setCurrentDate();
};

init();

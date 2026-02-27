import * as model from "./model";
import workoutExercisesView from "./views/workoutExercisesView";

const selectedWorkout = async function () {
  // get data from local storage
  await model.fetchWorkoutPlan();
  const workoutPlan = model.state.workouts;

  // workout type from url id
  const params = new URLSearchParams(window.location.search);
  const selectedWorkoutType = params.get("id").at(-1);

  // filter workout
  const selectedWorkout = workoutPlan.filter(
    (el) => el[0].workout === selectedWorkoutType,
  );
  // workout info
  const workoutType = [...selectedWorkout][0][0].workout;
  const workoutLength = [...selectedWorkout][0].length;

  workoutExercisesView.render(...selectedWorkout);
  workoutExercisesView.addHandlerCheckbox(workoutLength);
  workoutExercisesView.addSubmitButtonHandler(workoutLength, workoutType);

  console.log(workoutType, workoutLength);
};

const init = function () {
  selectedWorkout();
  workoutExercisesView.addReturnButtonHandler();
};

init();

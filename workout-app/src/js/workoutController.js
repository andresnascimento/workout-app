import * as model from "./model";
import workoutExercisesView from "./views/workoutExercisesView";
let currentWorkoutData = null;
const checkedExercises = [];

const filterSelectedWorkout = async function () {
  // filter the workout based on url id and updates the currentWorkoutData obj

  // fetch data
  await model.fetchWorkoutPlan();
  const workoutPlan = model.state.workouts;

  // get workout type from url id
  const params = new URLSearchParams(window.location.search);
  const selectedWorkoutType = params.get("id").at(-1);

  // filter workout
  const selectedWorkout = workoutPlan.filter(
    (el) => el[0].workout === selectedWorkoutType,
  );

  // workout info
  const workoutType = [...selectedWorkout][0][0].workout;
  const workoutLength = [...selectedWorkout][0].length;

  currentWorkoutData = { selectedWorkout, workoutType, workoutLength };
};

const controlCheckbox = function (value) {
  // temporally saves finished exercises
  checkedExercises.includes(value)
    ? checkedExercises.splice(checkedExercises.indexOf(value), 1)
    : checkedExercises.push(value);
  // control interface updates
  workoutExercisesView.enableSubmitButton(checkedExercises);
  workoutExercisesView.updateProgressBar(
    checkedExercises,
    currentWorkoutData.workoutLength,
  );
};

const controlSubmitWorkout = function () {
  // check if all exercises are done
  const isComplete =
    currentWorkoutData.workoutLength === checkedExercises.length;
  if (!isComplete) {
    workoutExercisesView.openDialog("feedback");
  } else {
    workoutExercisesView.openDialog("success");
  }

  // future improvement: if the user clicks on 'back to workout list', check if the setLatestWorkout() was called and change it back if it was
  model.setLatestWorkout(currentWorkoutData.workoutType);
};

const init = async function () {
  await filterSelectedWorkout();
  workoutExercisesView.render(currentWorkoutData.selectedWorkout[0]);
  workoutExercisesView.addHandlerCheckbox(controlCheckbox);
  workoutExercisesView.addSubmitButtonHandler(controlSubmitWorkout);
  workoutExercisesView.addReturnButtonHandler();
};

init();

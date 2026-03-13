import exercisesView from "./views/exercisesView.js";
import exercises from "./api/exercises.js";
import userState from "./api/user-state.js";

async function controlExerciseList() {
  try {
    exercisesView.renderSpinner();
    const params = new URLSearchParams(window.location.search);
    const workoutId = params.get("id");
    const exerciseList = await exercises.getExercises(workoutId);
    exercisesView.render(exerciseList);
  } catch (error) {
    console.error("Controller error:", error);
  }
}

async function controlSubmitWorkout(workoutId) {
  try {
    await userState.saveLastWorkout(workoutId);
  } catch (error) {
    console.error("Controller error:", error);
  }
}

const init = async function () {
  await controlExerciseList();
  exercisesView.addSubmitButtonHandler(controlSubmitWorkout);
  exercisesView.addReturnButtonHandler();
  exercisesView.addHandlerCheckbox();
};

init();

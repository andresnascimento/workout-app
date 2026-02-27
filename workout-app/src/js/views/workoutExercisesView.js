class WorkoutExerciseView {
  _workoutForm = document.querySelector("#workoutForm");
  _exerciseList = document.querySelector(".workout-exercises");
  _exercisePageTitle = document.querySelector(".workout-exercise-title");
  _successDialogTitle = document.querySelector(".success-dialog__feedback");
  _progressIndicator = document.querySelector(".progress-indicator");

  _returnBtn = document.querySelector("#returnBtn");
  _submitWorkoutBtn = document.querySelector("#submitWorkout");
  _confirmWorkoutBtn = document.querySelector("#confirmButton");
  _successDialogBtn = document.querySelector("#successButton");

  _confirmDialog = document.querySelector("#confirmDialog");
  _successDialog = document.querySelector("#successDialog");

  _progressIndicatorCounter = 0;
  _finishedExercises = [];

  _generateExerciseList(exercise) {
    return `
        <li>
            <label>
            <input type="checkbox" name="exercise" value="${exercise.exercise}" />
            ${exercise.exercise} — ${exercise.set}x${exercise.rep}
            </label>
        </li>

    `;
  }

  _generateTitle(title) {
    this._exercisePageTitle.innerHTML = title;
  }

  _generateProgressBar(progress = 0, workoutLength) {
    const markup = `<p>${progress} de ${workoutLength} exercícios concluídos</p>
      <progress value="${progress}" max="${workoutLength}"></progress>`;
    this._progressIndicator.innerHTML = markup;
  }

  render(data) {
    if (data.length === 0) return;

    data.forEach((el) => {
      const markup = this._generateExerciseList(el);

      this._exerciseList.insertAdjacentHTML("beforeend", markup);
    });

    this._generateTitle(`Workout ${data[0].workout}`);
    this._generateProgressBar(0, data.length);
  }

  _finishWorkout(workoutLength, workoutType) {
    this._successDialogTitle.innerHTML = `You completed Workout ${workoutType}`;
    // check if all the exercises are finished
    workoutLength === this._finishedExercises.length
      ? this._successDialog.showModal()
      : this._confirmDialog.showModal();

    // add logic for success

    // back to workout list (IMPROVE LATER)
    this._successDialogBtn.addEventListener("click", () => history.back());
    this._confirmWorkoutBtn.addEventListener("click", () => {
      this._successDialog.showModal();
    });
  }

  // HANDLERS
  addHandlerCheckbox(workoutLength) {
    this._exerciseList.addEventListener("change", (e) => {
      const exerciseArr = this._finishedExercises;
      const value = e.target.value;

      // temporally saves finished exercises
      exerciseArr.includes(value)
        ? exerciseArr.splice(exerciseArr.indexOf(value), 1)
        : exerciseArr.push(value);

      // changes progress indicator
      this._generateProgressBar(exerciseArr.length, workoutLength);

      // enable submit button
      this._submitWorkoutBtn.disabled = exerciseArr.length > 0 ? false : true;
    });
  }

  addReturnButtonHandler() {
    this._returnBtn.addEventListener("click", () => history.back());
  }
  addSubmitButtonHandler(workoutLength, workoutType) {
    // opens confirmation modal
    this._workoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._finishWorkout(workoutLength, workoutType);
    });
  }
}

export default new WorkoutExerciseView();

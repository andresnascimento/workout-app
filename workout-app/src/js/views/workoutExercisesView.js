class WorkoutExerciseView {
  _workoutForm = document.querySelector("#workoutForm");
  _exerciseList = document.querySelector(".js-workout-exercises");
  _exercisePageTitle = document.querySelector(".js-exercise-title");
  _exerciseDescription = document.querySelector(".js-exercise-description");
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
        <li class="exercise__item">
            <label class="u-flex">
            <input class="exercise__check" type="checkbox" name="exercise" value="${exercise.exercise}" />
                <div>
                    <p class="exercise__name">${exercise.exercise}</p>
                    <p class="exercise__info">${exercise.set}x${exercise.rep}</p>
                </div>
            </label>
        </li>

    `;
  }

  _generateTitle(title, description) {
    this._exercisePageTitle.innerHTML = title;
    this._exerciseDescription.innerHTML = description;
  }

  _generateProgressBar(progress = 0, workoutLength) {
    const markup = ` <progress exercise__progress-bar value="${progress}" max="${workoutLength}"></progress>
      <p class="exercise__progress-legend">${progress} de ${workoutLength} exercícios concluídos</p>`;
    this._progressIndicator.innerHTML = markup;
  }

  render(data) {
    if (data.length === 0) return;

    data.forEach((el) => {
      const markup = this._generateExerciseList(el);

      this._exerciseList.insertAdjacentHTML("beforeend", markup);
    });

    this._generateTitle(`Workout ${data[0].workout}`, `${data[0].description}`);
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

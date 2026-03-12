class WorkoutExerciseView {
  _workoutForm = document.querySelector("#workoutForm");
  _exerciseList = document.querySelector(".js-workout-exercises");
  _exercisePageTitle = document.querySelector(".js-exercise-title");
  _exerciseDescription = document.querySelector(".js-exercise-description");
  _successDialogTitle = document.querySelector(".js-dialog__success-title");
  _progressIndicator = document.querySelector(".progress-indicator");

  _returnBtn = document.querySelector("#returnBtn");
  _submitWorkoutBtn = document.querySelector("#submitWorkout");
  _confirmWorkoutBtn = document.querySelector("#confirmButton");
  _successDialogBtn = document.querySelector("#successButton");

  _confirmDialog = document.querySelector("#confirmDialog");
  _successDialog = document.querySelector("#successDialog");

  _selectedExercise;
  _selectedWorkoutName;
  _selectedWorkoutTitle;

  _generateExerciseList(exercise) {
    return `
        <li data-exercise-id="${exercise.id}" class="exercise__item">
            <label class="u-flex exercise__item-checkbox">
                <input class="exercise__check" type="checkbox" name="${exercise.exercise}" value="${exercise.exercise}" />
                <span class="checkbox__box"></span>
                <div class="exercise__content-container">
                    <p class="exercise__name">${exercise.exercise}</p>
                    <p class="exercise__info">${exercise.sets}x${exercise.reps} | ${exercise.rest} rest</p>
                </div>
            </label>
        </li>

    `;
  }

  _generateProgressBar(progress = 0, workoutLength) {
    const markup = ` <progress exercise__progress-bar value="${progress}" max="${workoutLength}"></progress>
      <p class="exercise__progress-legend">${progress} de ${workoutLength} exercícios concluídos</p>`;
    this._progressIndicator.innerHTML = markup;
  }

  render(data) {
    this._selectedExercise = data.exercises;

    if (this._selectedExercise.length === 0) return;

    this._selectedExercise.forEach((el) => {
      const markup = this._generateExerciseList(el);
      this._exerciseList.insertAdjacentHTML("beforeend", markup);
    });

    this._exercisePageTitle.innerHTML = `Workout ${data.name}`;
    this._exerciseDescription.innerHTML = data.title;
    this._successDialogTitle.innerHTML = `Workout ${data.name} Finished!`;

    this._generateProgressBar(0, this._selectedExercise.length);
  }

  // HANDLERS
  addHandlerCheckbox(handler) {
    this._exerciseList.addEventListener("change", (e) => {
      handler(e.target.value);
    });
  }

  updateProgressBar(exerciseArr, workoutLength) {
    this._generateProgressBar(exerciseArr.length, workoutLength);
  }

  enableSubmitButton(exerciseArr) {
    this._submitWorkoutBtn.disabled = exerciseArr.length > 0 ? false : true;
  }

  addReturnButtonHandler() {
    this._returnBtn.addEventListener("click", () => history.back());
  }

  openDialog(type) {
    if (type === "feedback") this._confirmDialog.showModal();
    if (type === "success") this._successDialog.showModal();
  }
  addSubmitButtonHandler(handler) {
    this._workoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this._successDialogBtn.addEventListener("click", () => history.back());
      this._confirmWorkoutBtn.addEventListener("click", () => {
        this._successDialog.showModal();
      });

      handler();
    });
  }
}

export default new WorkoutExerciseView();

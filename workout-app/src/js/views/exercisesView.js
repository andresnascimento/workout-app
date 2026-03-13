import View from "./view";

class WorkoutExerciseView extends View {
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
  _selectedWorkoutId;
  _selectedWorkoutTitle;
  _checkedExercises = [];

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

  _updateProgressBar(progress = 0, workoutLength) {
    const markup = ` <progress exercise__progress-bar value="${progress}" max="${workoutLength}"></progress>
      <p class="exercise__progress-legend">${progress} de ${workoutLength} exercícios concluídos</p>`;
    this._progressIndicator.innerHTML = markup;
  }

  render(data) {
    this._selectedExercise = data.exercises;
    this._selectedWorkoutId = data.id;

    if (this._selectedExercise.length === 0) return;
    this._exerciseList.innerHTML = "";
    this._selectedExercise.forEach((el) => {
      const markup = this._generateExerciseList(el);
      this._exerciseList.insertAdjacentHTML("beforeend", markup);
    });

    this._exercisePageTitle.innerHTML = `Workout ${data.name}`;
    this._exerciseDescription.innerHTML = data.title;
    this._successDialogTitle.innerHTML = `Workout ${data.name} Finished!`;

    this._updateProgressBar(0, this._selectedExercise.length);
  }
  renderSpinner() {
    this._exerciseList.innerHTML = "";
    this.renderLoading(this._exerciseList);
  }

  // HANDLERS
  addHandlerCheckbox() {
    this._exerciseList.addEventListener("change", (e) => {
      // array of checked exercises
      const exerciseId = e.target.closest(".exercise__item").dataset.exerciseId;
      if (this._checkedExercises.includes(exerciseId)) {
        this._checkedExercises.splice(
          this._checkedExercises.indexOf(exerciseId),
          1,
        );
      } else {
        this._checkedExercises.push(exerciseId);
      }
      // updates interface
      this._submitWorkoutBtn.disabled =
        this._checkedExercises.length > 0 ? false : true;

      this._updateProgressBar(
        this._checkedExercises.length,
        this._selectedExercise.length,
      );
    });
  }

  addReturnButtonHandler() {
    // Future improvement: check if at least one exercise was checked
    [this._successDialogBtn, this._returnBtn].forEach((e) =>
      e.addEventListener("click", () => history.back()),
    );
  }

  _showDialog(dialog) {
    dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add("dialog-open"));

    // add closing event for dialog's animation
    const form = dialog.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      dialog.classList.remove("dialog-open");
      dialog.classList.add("dialog-closing");

      setTimeout(() => {
        dialog.classList.remove("dialog-closing");
        dialog.close();
      }, 200);
    });
  }

  addSubmitButtonHandler(handler) {
    this._workoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._checkedExercises.length === this._selectedExercise.length) {
        this._showDialog(this._successDialog);
        handler(this._selectedWorkoutId);
      } else {
        this._showDialog(this._confirmDialog);
        this._confirmWorkoutBtn.addEventListener("click", () => {
          handler(this._selectedWorkoutId);
          this._showDialog(this._successDialog);
        });
      }
    });
  }
}

export default new WorkoutExerciseView();

import View from "./view";
class WorkoutListView extends View {
  _workoutList = document.querySelector(".workout__list-container");
  _currentDate = document.querySelector(".js-current-date");
  _workouts;
  _lastWorkout;

  _generateListMarkup(workout) {
    return `
    <li data-id="${workout.id}" data-workout-type="${workout.name}" class="workout-card u-flex" > 
        <div class="workout-card__type-container">
            <p class="workout-card__workout-type">${workout.name}</p>
        </div>
        <div class="workout-card__body">
            <h2 class="workout-card__title">${workout.title}</h2>
            <button class="btn btn-md bnt-primary u-flex js-btn-start-workout">Start workout ${workout.name} <span class="material-symbols-outlined btn-icon"> arrow_forward </span></button>
        </div>
    </li>
    `;
  }
  _orderWorkout() {
    const lastWorkoutID = this._lastWorkout.id;
    // get the latest workout index
    const index = this._workouts.findIndex((workout) => {
      if (workout.id === lastWorkoutID) return workout;
    });

    // set the next workout index
    const nextIndex = (index + 1) % this._workouts.length;
    return [
      ...this._workouts.slice(nextIndex),
      ...this._workouts.slice(0, nextIndex),
    ];
  }

  setCurrentDate() {
    const date = new Date();
    const formatted = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    })
      .format(date)
      .replace(" ", ", ");
    this._currentDate.innerHTML = formatted;
  }

  render(data) {
    this._lastWorkout = data.lastWorkout;
    this._workouts = data.workouts;
    if (this._workouts.length === 0) return;

    const orderedWorkouts = this._orderWorkout();
    this._workoutList.innerHTML = "";
    orderedWorkouts.forEach((e) => {
      const markup = this._generateListMarkup(e);
      //this._workoutList.innerHTML = "";
      this._workoutList.insertAdjacentHTML("beforeend", markup);
    });
  }

  renderSpinner() {
    this._workoutList.innerHTML = "";
    this.renderLoading(this._workoutList);
  }

  addWorkoutSelectHandler() {
    this._workoutList.addEventListener("click", (e) => {
      // get the workout type to use as ID for the url
      const workoutID = e.target.closest(".workout-card").dataset.id;
      //   const id = `workout${workoutType}`;

      const btn = e.target.closest(".js-btn-start-workout");
      if (!btn) return;

      window.location.href = `workout.html?id=${workoutID}`;
      //console.log(btn);
    });
  }
}

export default new WorkoutListView();

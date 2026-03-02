class WorkoutListView {
  _workoutList = document.querySelector(".workout__list-container");

  _generateListMarkup(workout) {
    return `
    <li data-workout-type="${workout.workout}" class="workout-card u-flex" > 
        <div class="workout-card__type-container">
            <p class="workout-card__workout-type">${workout.workout}</p>
        </div>
        <div class="workout-card__body">
            <h2 class="workout-card__title">${workout.description}</h2>
            <button class="btn btn-md bnt-primary js-btn-start-workout">Start workout ${workout.workout}</button>
        </div>
    </li>
    `;
  }

  render(data) {
    if (data.length === 0) return;

    data.forEach((el) => {
      const markup = this._generateListMarkup(el[0]);
      this._workoutList.insertAdjacentHTML("beforeend", markup);
    });
  }

  addWorkoutSelectHandler() {
    this._workoutList.addEventListener("click", (e) => {
      // get the workout type to use as ID for the url
      const workoutType = e.target.closest(".workout-card").dataset.workoutType;
      const id = `workout${workoutType}`;

      const btn = e.target.closest(".js-btn-start-workout");
      if (!btn) return;

      window.location.href = `workout.html?id=${id}`;
      //console.log(btn);
    });
  }
}

export default new WorkoutListView();

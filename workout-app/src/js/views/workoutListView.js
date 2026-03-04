class WorkoutListView {
  _workoutList = document.querySelector(".workout__list-container");
  _currentDate = document.querySelector(".js-current-date");

  _generateListMarkup(workout) {
    return `
    <li data-workout-type="${workout.workout}" class="workout-card u-flex" > 
        <div class="workout-card__type-container">
            <p class="workout-card__workout-type">${workout.workout}</p>
        </div>
        <div class="workout-card__body">
            <h2 class="workout-card__title">${workout.description}</h2>
            <button class="btn btn-md bnt-primary u-flex js-btn-start-workout">Start workout ${workout.workout} <span class="material-symbols-outlined btn-icon"> arrow_forward </span></button>
        </div>
    </li>
    `;
  }
  _rotateWorkout(data, latestWorkout) {
    // get the latest workout index
    const index = data.findIndex((item) => {
      if (item[0].workout === latestWorkout) return item;
    });

    if (index === -1) return data;
    // set the next workout index
    const nextIndex = (index + 1) % data.length;

    return [...data.slice(nextIndex), ...data.slice(0, nextIndex)];
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
    if (data.length === 0) return;
    // const workoutOrderedList = this._rotateWorkout(data, latestWorkout);
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

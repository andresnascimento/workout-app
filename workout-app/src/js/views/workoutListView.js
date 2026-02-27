class WorkoutListView {
  _workoutList = document.querySelector(".workout-list");

  _generateListMarkup(workout) {
    return `
        <li> <a href="/workout.html?id=workout${workout.workout}">Workout: ${workout.workout}</a> </li>
    `;
  }

  render(data) {
    if (data.length === 0) return;

    data.forEach((el) => {
      const markup = this._generateListMarkup(el[0]);
      this._workoutList.insertAdjacentHTML("beforeend", markup);
    });
  }
}

export default new WorkoutListView();

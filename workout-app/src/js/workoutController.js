import workoutView from "./views/workoutView.js";
import workout from "./api/workouts.js";
import auth from "./api/auth.js";
import profile from "./api/profile.js";

async function controlWorkoutList() {
  try {
    workoutView.renderSpinner();
    const workoutData = await workout.getWorkoutData();
    console.log(workoutData);
    workoutView.render(workoutData);
    workoutView.addWorkoutSelectHandler();
  } catch (error) {
    console.error("Controller error:", error);
  }
}

async function controlProfile() {
  const profileData = await profile.getProfile();
  console.log(profileData);
  workoutView.renderProfile(profileData);
}

async function controlLogout() {
  await auth.logout();
  window.location.href = "/login.html";
}

async function init() {
  workoutView.setCurrentDate();
  controlWorkoutList();
  controlProfile();
  workoutView.logoutHandler(controlLogout);
}

init();

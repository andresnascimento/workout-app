console.log("hello world");

// CONFIG

const spreadsheetId = "1vl8j8trlq4WvrlbA2ilAS8-aJ_JWDoiggMN9PB_i71g";
const apiKey = "AIzaSyBmXc6unLgEKRSoyaI4BoVhCsjsb43PAKI";
const range = "workout!A1:G";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

// MODEL
const getData = async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const createWorkoutPlanObj = async function () {
  try {
    const dataValues = await getData();
    const objKeys = dataValues[0];
    const objValues = dataValues.slice(1);

    const workoutPlan = objValues.map((row) =>
      Object.fromEntries(objKeys.map((key, i) => [key, row[i]])),
    );
    console.log(workoutPlan);
    return workoutPlan;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const createWorkout = function (workoutType, workoutObj) {
  const workoutPlan = workoutObj.filter(
    (workout) => workout.workout === workoutType,
  );
  return workoutPlan;
};

const init = async function () {
  const workoutPlan = await createWorkoutPlanObj();
  const workoutA = await createWorkout("A", workoutPlan);

  console.log(workoutA);
};

init();

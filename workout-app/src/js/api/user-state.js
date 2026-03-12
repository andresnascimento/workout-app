import { supabase } from "../services/supabase.js";
async function getLastWorkout() {
  const { data, error } = await supabase
    .from("user_state")
    .select(
      `
      last_workout_id,
      workouts (
        id,
        name,
        title
      )
    `,
    )
    .single();

  if (error) {
    console.error("Error on getting last workout", error.message);
    throw new Error(error.message);
  }

  return data;
}

async function saveLastWorkout(workoutId) {
  await supabase
    .from("user_state")
    .update({
      last_workout_id: workoutId,
    })
    .eq("id", 1);
}

export default { getLastWorkout, saveLastWorkout };

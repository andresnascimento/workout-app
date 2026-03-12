import { supabase } from "../services/supabase.js";
async function getExercises(workoutId) {
  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      id,
      name,
      title,
      order_index,
      exercises (
        id,
        order_index,
        exercise,
        sets,
        reps,
        rest,
        description
      )
    `,
    )
    .eq("id", workoutId)
    .order("order_index", { foreignTable: "exercises" })
    .single();

  if (error) {
    console.error("Error loading exercises", error);
    return null;
  }

  return data;
}

export default { getExercises };

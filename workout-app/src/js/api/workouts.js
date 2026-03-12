import { supabase } from "../services/supabase.js";

async function getWorkoutData() {
  const { data, error } = await supabase
    .from("user_state")
    .select(
      `
      last_workout_id,
      workouts (
        id,
        name,
        title,
        order_index
      )
    `,
    )
    .single();

  if (error) {
    console.error("Error on getting workout data", error.message);
    throw new Error(error.message);
  }

  const { data: workouts } = await supabase
    .from("workouts")
    .select("id, name, title, order_index")
    .order("order_index");

  return {
    lastWorkout: data.workouts,
    workouts,
  };
}

export default { getWorkoutData };

// The following query gets the workout in the order based on the last workout id
// try this in the future as a possible performance improvement:

// async function getOrderedWorkouts() {
//   // get last workout
//   const { data: state } = await supabase
//     .from("user_state")
//     .select("last_workout_id")
//     .single()

//   const lastWorkoutId = state.last_workout_id

//   // get last workout order_index
//   const { data: lastWorkout } = await supabase
//     .from("workouts")
//     .select("order_index")
//     .eq("id", lastWorkoutId)
//     .single()

//   const lastIndex = lastWorkout.order_index

//   // get all workouts
//   const { data: workouts } = await supabase
//     .from("workouts")
//     .select("*")

//   // reorder
//   const ordered = workouts.sort((a, b) => {
//     const aIndex = a.order_index <= lastIndex
//       ? a.order_index + workouts.length
//       : a.order_index

//     const bIndex = b.order_index <= lastIndex
//       ? b.order_index + workouts.length
//       : b.order_index

//     return aIndex - bIndex
//   })

//   return ordered
// }

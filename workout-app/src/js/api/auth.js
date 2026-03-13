import { supabase } from "../services/supabase.js";

async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log("User created:", data);
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    console.log(error.message);
    return;
  }

  console.log("Logged in:", data);
}

async function getUserId() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error(error);
    return;
  }
  return userData.user.id;
}

async function logout() {
  await supabase.auth.signOut();
}

export default { signUp, login, logout, getUserId };

import signUpView from "./views/signUpView";
import auth from "./api/auth";

async function controlSignUp(email, password) {
  try {
    await auth.signUp(email, password);
  } catch (error) {}
}

function controlReturn() {
  window.location.href = "/login.html";
}

async function init() {
  signUpView.signUp(controlSignUp);
  signUpView.cancelRegister(controlReturn);
}

init();

import loginView from "./views/loginView";
import auth from "./api/auth";

const controlLogin = async function (email, password) {
  try {
    console.log(email, password);
    await auth.login(email, password);
    window.location.href = "/index.html";
  } catch (error) {}
};

async function init() {
  loginView.registerUser();
  loginView.loginHandler(controlLogin);
}

init();

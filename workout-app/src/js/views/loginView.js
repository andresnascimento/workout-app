import View from "./view";
class loginView extends View {
  _userLoginBtn = document.querySelector("#userLogin");
  _userEmailInput = document.querySelector("#userEmail");
  _userPasswordInput = document.querySelector("#userPassword");
  _userRegisterBtn = document.querySelector("#newUser");

  registerUser() {
    this._userRegisterBtn.addEventListener("click", () => {
      window.location.href = `register.html`;
    });
  }

  loginHandler(handler) {
    this._userLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this._userEmailInput.value, this._userPasswordInput.value);
    });
  }
}

export default new loginView();

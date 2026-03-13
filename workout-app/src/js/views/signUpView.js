import View from "./view";
class signUpView extends View {
  _cancelBtn = document.querySelector("#cancelRegister");
  _signUpBtn = document.querySelector("#registerUser");

  _emailInput = document.querySelector("#registerEmail");
  _passwordInput = document.querySelector("#registerPassword");

  signUp(handler) {
    this._signUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log(this._emailInput.value, this._passwordInput.value);
      handler(this._emailInput.value, this._passwordInput.value);
    });
  }

  cancelRegister(handler) {
    this._cancelBtn.addEventListener("click", (e) => {
      handler();
    });
  }
}

export default new signUpView();

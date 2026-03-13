import lottie from "lottie-web";
export default class View {
  // FUTURE IMPROVEMENT: add the class view as parent for the classes workout and exercises
  // _data;
  // render(data) {
  //   if (data.length === 0) {
  //     return this.renderError();
  //   }

  //   this._data = data;
  //   const markup = this._generateMarkup();

  //   if (!render) return markup;

  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  loadingAnimation() {
    this._animationContainer = document.querySelector("#lottie");
    if (!this._animationContainer) return;

    this.searchingAnimation = lottie.loadAnimation({
      container: this._animationContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "src/img/loading.json",
    });
  }

  renderLoading(parentElement) {
    const markup = `
        <li class="workout__loading">
            <div id="lottie" style="width: 100%; height: 200px"></div>
            <h2>Loading…</h2>
        </li> 
    `;
    parentElement.insertAdjacentHTML("afterbegin", markup);
    this.loadingAnimation();
  }
}

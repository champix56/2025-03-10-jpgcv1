class Images extends Array {
  static #ressourceLocation = "/images";
  static get ressourceLocation() {
    return Images.#ressourceLocation;
  }
  constructor() {
    super(arguments);
  }
  loadImages() {
    const primages = fetch(`${REST_SERVER}${Images.ressourceLocation}`).then(
      (r) => r.json()
    );
    primages.then((is) => {
      this.splice(0);
      is.map((i) => this.push(i));
    });
    return primages;
  }
  find(id) {
    return super.find((e) => e.id === id);
  }
}
window.images = new Images();
window.promiseLoaderImages = images.loadImages();

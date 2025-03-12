class Images extends Array {
  static #RESSOURCE_URI = "/images";
  static get RESSOURCE_URI() {
    return Images.#RESSOURCE_URI;
  }
  constructor() {
    super();
  }
  /**
   * trouve l'image dont l'id est fournit en param
   * @param {number} id id de l'image a trouver
   * @returns {Image|undefined} retourne l'image trouvée ou undefined si pas trouvée
   */
  find(id) {
    return super.find((img) => img.id === id);
  }
  filter = undefined;
  loadImage() {
    return fetch(`http://localhost:5679${Images.RESSOURCE_URI}`)
      .then((r) => r.json())
      .then((arr) => {
        super.push(...arr);
        return this;
      });
  }
}


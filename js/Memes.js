class Meme {
  static #RESSOURCE_URI = "/memes";
  titre = "";
  text = "";
  x = 0;
  y = 17;
  fontWeight = "500";
  fontSize = 30;
  underline = false;
  italic = false;
  imageId = 0;
  color = "#000000";
  frameSizeX = 0;
  frameSizeY = 0;
  get image() {
    return images.loadImage().then((imgs) => imgs.id === this.imageId);
  }
  set image(id) {
    const img = images.loadImage().then((imgs) => imgs.id === id);
    if (img) this.imageId = img.id;
    else return null;
  }
  save = async () => {
    const pmeme = await fetch(
      `http://localhost:5679${Meme.#RESSOURCE_URI}${
        this.id ? "/" + this.id : ""
      }`,
      {
        method: this.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this),
      }
    );
    const meme = await pmeme.json();
    Object.assign(this, meme);
  };
}

class Memes extends Array {
  #isLoaded = false;

  /**
   * trouve le meme dont l'id est fournit en parametre
   * @param {number} id
   * @returns {Meme|undefined} meme trouvé ou undefined
   */
  find(id) {
    return super.find((m) => m.id === id);
  }
  /**
   *
   * @param {Meme} meme
   */
  push(meme) {
    meme.save();
    return super.push(meme);
  }
  replace(meme) {
    const i = this.findIndex((memeInList) => memeInList.id === meme.id);
    this[i] = meme;
    meme.save();
  }
  /**
   *charge les memes depuis le reste
   * @param {boolean} force
   * @returns {Promise<Meme>} Promise des memes chargés
   */
  loadMemes = async (force = false) => {
    if (!force && this.#isLoaded) {
      return await new Promise((r) => {
        r(this);
      });
    }
    const pr = await fetch(`http://localhost:5679${Meme.RESSOURCE_URI}`);
    const arr = await pr.json();
    this.splice(0);
    super.push(...arr);
    this.#isLoaded = true;
    return this;
  };
}

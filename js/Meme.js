const emptyMeme = { text: "coucou" };

class DOMMeme {
  static #templateUrlMemeSVG = "/composant/memeSvgVierver.svg";
  static #ressourceUrl = "/memes";
  static #templateSvg = undefined;
  #meme = emptyMeme;

  #node = undefined;
  constructor(node) {
    this.#node = node;
  }
  save() {
    return fetch(
      `${REST_SERVER}${DOMMeme.#ressourceUrl}${
        undefined !== this.#meme.id ? `/${this.#meme.id}` : ""
      }`,
      {
        method: undefined !== this.#meme.id ? "PUT" : "POST",
        body: JSON.stringify(this.#meme),
      }
    ).then((m) => {
      this.#meme = m;
      return this.#meme;
    });
  }
  templateLoading() {
    if (DOMMeme.#templateSvg)
      return new Promise((r) => {
        this.#node.innerHTML = DOMMeme.#templateSvg;
        r(DOMMeme.#templateSvg);
      });
    return fetch(DOMMeme.#templateUrlMemeSVG)
      .then((r) => r.text())
      .then((s) => {
        DOMMeme.#templateSvg = s;
        this.#node.innerHTML = DOMMeme.#templateSvg;
        return DOMMeme.#templateSvg;
      });
  }
  #fillTemplateData() {
    const svg=this.#node.querySelector("svg");
    
    
    svg.querySelector('text').innerHTML = this.#meme.text;
    //svg.querySelector("image").src = this.#meme.text;
  }
  static getSvgOfMeme(meme) {
    const container = document.createElement("div");
    const memedom = new DOMMeme(container);
    return memedom.templateLoading().then((t) => {
      memedom.#fillTemplateData();
      return container.firstChild;
    });
  }
}

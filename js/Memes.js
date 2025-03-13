class Meme {
  static #RESSOURCE_URI = "/memes";
  static get RESSOURCE_URI() {
    return Meme.#RESSOURCE_URI;
  }
  titre = "";
  text = "";
  x = 0;
  y = 17;
  fontWeight = "500";
  fontSize = 30;
  underline = false;
  italic = false;
  imageId = 1;
  color = "#000000";
  frameSizeX = 0;
  frameSizeY = 0;
  /**
   * enregistre l'instance du meme
   * @returns {Meme} server return meme on POST/PUT
   */
  save = async () => {
    const pr = await fetch(
      `${REST_BASE_URL}${Meme.RESSOURCE_URI}${
        undefined !== this.id ? `/${this.id}` : ""
      }`,
      {
        method: undefined !== this.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this),
      }
    );
    const datas = await pr.json();
    return Object.assign(this, datas);
  };
  //   static getInstanceFromParsedObject(memeObject){
  //     const m=new Meme();
  //     Object.assign(m,jsonMemeObject);
  //     return m;
  //   }
}
class Memes extends Array {
  #isLoaded = false;
  #pr = undefined;
  find(id) {
    return super.find(m=>m.id===id);
  }
  /**
   * ajoute dans la liste un nouveau meme et post au server pour creationd'id
   * @param {Meme} meme
   * @returns {Meme}
   */
  push(meme) {
    const returnedMeme = meme.save();
    super.push(returnedMeme);
    return returnedMeme;
  }
  #getFetchPr = () => {
    if (undefined === this.#pr) {
      this.#pr = fetch(`http://localhost:5679${Meme.RESSOURCE_URI}`).then((r) =>
        r.json()
      );
    }
    return this.#pr;
  };
  loadMemes = async (force = false) => {
    //retour de ce qui est deja totalement resolue
    if (!force && this.#isLoaded) {
      return await new Promise((r) => {
        r(this);
      });
    }
    //sinon retour de la promise de traitement complet
    //pour pouvoir toujours await ou the la fin total du traitement
    //avec toujours l'instance this de l'array en charge de rsolution complete
    return new Promise((resolved) => {
      this.#isLoaded = false;
      console.log("pr state", this.#pr);
      const pr = this.#getFetchPr().then((arr) => {
        // const arr = await pr.json();
        console.log(arr);
        this.splice(0);
        arr.map((jmeme) => {
          super.push(Object.assign(new Meme(), jmeme));
        });
        this.#pr = undefined;
        this.#isLoaded = true;
        resolved(this);
      });
    });
  };
}
const memes = new Memes();
console.time("start loading");
console.time("loading1");
memes.loadMemes().then(() => {
  console.timeEnd("loading1");
});
console.time("loading2");
memes.loadMemes().then(() => {
  console.timeEnd("loading2");
});
console.timeEnd("start loading");

const emptyMeme = {
  titre: "",
  text: "",
  x: 0,
  y: 17,
  fontWeight: "500",
  fontSize: 30,
  underline: false,
  italic: false,
  imageId: 0,
  color: "#000000",
  frameSizeX: 0,
  frameSizeY: 0,
};

class Editor {
  meme = emptyMeme;
  #params = {};
  /**
   * @type HTMLElement
   */
  #domNode;
  // /**
  //  *
  //  * @returns {HTMLElement}
  //  */
  // get #domNodeInstance(){return this.#domNode;}
  /**
   * initialisation de la vues, des events, du meme en cours
   * @param {HTMLElement} domNode
   */
  initEditor(domNode, params) {
    console.log(arguments);
    this.#params = params;
    if (!domNode) {
      return;
    }
    this.#domNode = domNode;
    this.#fillSelect();
    this.#fillFormEvent();
  }
  #fillFormEvent() {
    // const onInputGeneric = (evt) => {
    //     switch(typeof  this.meme[evt.target.name]){
    //         case 'string':this.meme[evt.target.name] = evt.target.value;break;
    //         case 'number':this.meme[evt.target.name] = Number(evt.target.value);break;
    //     }
    //     this["set"+evt.target.name]();
    //     console.log(this.meme);
    //   };
    const onInputNumber = (evt) => {
      this.meme[evt.target.name] = Number(evt.target.value);
      this.#updateSvg();
      console.log(this.meme);
    };
    const onInputString = (evt) => {
      this.meme[evt.target.name] = evt.target.value;
      console.log(this.meme);
      this.#updateSvg();
    };
    const onCheckChange = (evt) => {
        this.meme[evt.target.name] = evt.target.checked;
        console.log(this.meme);
        this.#updateSvg();
      };

    const form = this.#domNode.querySelector("form");
    form["titre"].addEventListener("input", onInputString);
    form["text"].addEventListener("input", onInputString);
    form["color"].addEventListener("input", onInputString);
    form["fontWeight"].addEventListener("input", onInputString);
    form["x"].addEventListener("input", onInputNumber);
    form["x"].addEventListener("input", onInputNumber);
    form["frameSizeX"].addEventListener("input", onInputNumber);
    form["frameSizeY"].addEventListener("input", onInputNumber);
    form["fontSize"].addEventListener("input", onInputNumber);
    form["underline"].addEventListener("change", onCheckChange);
    form["italic"].addEventListener("change", onCheckChange);
    form["image"].addEventListener("change", (evt) => {
      this.meme.imageId = Number(evt.target.value);
      this.#updateSvg();
    });
  }

  #fillSelect = async () => {
    console.log("fillSelect");
    const primages = await images.loadImage();
    // const image=this.#domNode.querySelector("form #images .image");
    const select = this.#domNode.querySelector("select");
    const noImageOption = select.children[0];
    select.innerHTML = "";
    select.appendChild(noImageOption);
    primages.forEach((img) => {
      const opt = document.createElement("option");
      // const opt=noImageOption.cloneNode(true);
      opt.innerHTML = img.name;
      opt.value = img.id;
      select.appendChild(opt);

      // const i=image.cloneNode(true);
      // i.querySelector('img').src=i.url;
      // i.children[0].innerHTML+='-'+(Math.random()*1000).toFixed(0);
      // image.parentElement.appendChild(i);
    });
  };
  #fillData() {}
  #updateSvg() {

    
  }
}

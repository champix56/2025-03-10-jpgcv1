import { images } from "../../js/Images.js";
import { Meme } from "../../js/Memes.js";

const emptyMeme = new Meme();

export default class Editor {
  meme = emptyMeme;
  #oldMeme = Object.assign(new Meme(),emptyMeme);
  #imageNode;
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
  initEditor = async (domNode, params) => {
    //console.log(arguments);
    this.#params = params;
    if (!domNode) {
      return;
    }
    if(params&&params.id){
      const loadedMemePromise= await memes.loadMemes()
      this.meme=loadedMemePromise.find(Number(params.id));
      this.#oldMeme=Object(new Meme(),this.meme);
    }
    if(!this.meme){
      // this.meme=new Meme();
      // history.pushState(null,null,'/editor');
      router.error(404);
      return;
    }
    this.#domNode = domNode;
    this.#imageNode = domNode.querySelector("image");
    await this.#fillSelect(); //.then(()=>{
    this.#fillData();
    //});
    this.#fillFormEvent();
    this.#updateSvg();
  };
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
    form["y"].addEventListener("input", onInputNumber);
    form["frameSizeX"].addEventListener("input", onInputNumber);
    form["frameSizeY"].addEventListener("input", onInputNumber);
    form["fontSize"].addEventListener("input", onInputNumber);
    form["underline"].addEventListener("change", onCheckChange);
    form["italic"].addEventListener("change", onCheckChange);
    form["image"].addEventListener("change", (evt) => {
      this.meme.imageId = Number(evt.target.value);
      this.#updateSvg();
    });

    form.addEventListener("reset", (evt) => {
      this.meme=Object.assign(this.meme,this.#oldMeme);
      this.#fillData();
      this.#updateSvg();
    })
      form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this.meme.id) {
        this.meme.save();
      } else {
        memes.push(this.meme).then((m) => {
          history.pushState(undefined, undefined, "/editor/" + this.meme.id);
        });
      }
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
  #fillData() {
    const form = this.#domNode.querySelector("form");
    form.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox") {
        input.checked = this.meme[input.name];
      } else {
        input.value = this.meme[input.name];
      }
    });
    form["image"].value = this.meme.imageId;
  }
  #updateSvg = async () => {
    const svg = this.#domNode.querySelector("svg");
    const text = svg.querySelector("text");
    const imagesList = await images.loadImage();
    const currentImg = imagesList.find(this.meme.imageId);
    svg.setAttribute(
      "viewBox",
      `0 0 ${currentImg ? currentImg.w : "1000"} ${
        currentImg ? currentImg.h : "1000"
      }`
    );
    if (!currentImg) {
      this.#imageNode.remove();
    }
    if (currentImg) {
      if (!svg.querySelector("image")) {
        svg.insertBefore(this.#imageNode, text);
      }
      svg.querySelector("image").setAttribute("xlink:href", currentImg.url);
    }
    text.innerHTML = this.meme.text;
    text.setAttribute("x", this.meme.x);
    text.setAttribute("y", this.meme.y);
    text.setAttribute("font-style", this.meme.italic ? "italic" : "normal");
    text.setAttribute("font-size", this.meme.fontSize);
    text.style.textDecoration = this.meme.underline ? "underline" : "none";
    text.style.fontWeight = this.meme.fontWeight;
    text.style.fill = this.meme.color;
  };
}

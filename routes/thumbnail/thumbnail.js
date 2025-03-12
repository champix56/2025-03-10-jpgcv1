import { images } from "../../js/Images.js";
import { memes } from "../../js/Memes.js";
import router from "../../js/router.js";

export class Thumbnail {
  #domNode;
  constructor() {}
  initThumbnail = async (domNode) => {
    this.#domNode = domNode;
    await this.#reloadSVGsInView();
    router.mapRouterLinks(domNode.id);
  };
  #reloadSVGsInView = async () => {
    const g = this.#domNode.querySelector("#gallery");
    const group = g.querySelector(".thumbnail-meme");
    g.innerHTML = "";
    const memeAndImages = await Promise.all([
      memes.loadMemes(),
      images.loadImage(),
    ]);
    memeAndImages[0].forEach((meme) => {
      const node = group.cloneNode(true);
      node.querySelector("a").href = "/editor/" + meme.id;
      node.querySelector("span").innerHTML = meme.titre;
      const svg = node.querySelector("svg");
      const text = svg.querySelector("text");
      const imgnode = svg.querySelector("image");

      const currentImg = memeAndImages[1].find(meme.imageId);
      svg.setAttribute(
        "viewBox",
        `0 0 ${currentImg ? currentImg.w : "1000"} ${
          currentImg ? currentImg.h : "1000"
        }`
      );
      if (!currentImg) {
        imgnode.remove();
      }
      if (currentImg) {
        svg.querySelector("image").setAttribute("xlink:href", currentImg.url);
      }
      text.innerHTML = meme.text;
      text.setAttribute("x", meme.x);
      text.setAttribute("y", meme.y);
      text.setAttribute("font-style", meme.italic ? "italic" : "normal");
      text.setAttribute("font-size", meme.fontSize);
      text.style.textDecoration = meme.underline ? "underline" : "none";
      text.style.fontWeight = meme.fontWeight;
      text.style.fill = meme.color;
      g.appendChild(node);
    });
  };
}

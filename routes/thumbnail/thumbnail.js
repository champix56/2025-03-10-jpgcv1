class Thumbnail {
  /**
   * @type HTMLElement
   */
  #domNode = undefined;
  /**
   * @type HTMLElement
   */
  #baseToClone;
  initThumbnail = async (domNode) => {
    this.#domNode = domNode;
    this.#baseToClone = this.#domNode.querySelector("#thumb-meme-");
    this.#baseToClone.remove();
    const pri = images.loadImage();
    const prm = memes.loadMemes();
    const prAll = await Promise.all([pri, prm]);
    this.#initThumbnailContent(prAll[0], prAll[1]);
    router.mapRouterLinks(domNode.id);
  };
  /**
   *
   * @param {Images} images
   * @param {Array<Meme>} memes
   */
  #initThumbnailContent(images, memes) {
    const gallery = this.#domNode.querySelector("#gallery");
    memes.map((m) => {
      const cloned = this.#baseToClone.cloneNode(true);
      cloned.id += m.id;
      cloned.querySelector("a").href += "/" + m.id;
      cloned.querySelector("span").innerHTML = m.titre;
      const svg = cloned.querySelector("svg");
      const image = images.find(m.imageId);
      svg.setAttribute(
        "viewBox",
        `0 0 ${image ? image.w : "1000"} ${image ? image.h : "1000"}`
      );
    const imageNode = svg.querySelector("image");
      if (!image) {
        imageNode.remove();
      } else {
        imageNode.setAttribute("xlink:href", image.url);
      }
      const text = svg.querySelector("text");
      text.innerHTML = m.text;
      text.setAttribute("x", m.x);
      text.setAttribute("y", m.y);
      text.setAttribute("font-style", m.italic ? "italic" : "normal");
      text.setAttribute("font-size", m.fontSize);
      text.setAttribute("text-decoration", m.underline ? "underline" : "none");
      text.setAttribute("font-weight", m.fontWeight);
      text.setAttribute("fill", m.color);
      gallery.appendChild(cloned);
    });
  }
}

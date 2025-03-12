class Images extends Array {
  static #RESSOURCE_URI = "/images";
  #isLoaded=false;
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
  /**
   * 
   * @param {Promise<>Images} force 
   * @returns 
   */
  loadImage = async (force=false) => {
    if(!force && this.#isLoaded){
        return await new Promise(r=>{r(this)})
    }
    const pr = await fetch(`http://localhost:5679${Images.RESSOURCE_URI}`);
    const arr = await pr.json();    
    this.splice(0);
    super.push(...arr);
    this.#isLoaded=true;
    return this;
  };
}

export const images=new Images();
const loadedImages=images.loadImage();
loadedImages.then(images=>{console.log(images)})
class Meme {
  static #RESSOURCE_URI = "/memes";
  /**
   * enregistre l'instance du meme
   * @returns {Meme} server return meme on POST/PUT
   */
  save() {}
}
class Memes extends Array {
   
  find(id) {}
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
  loadMemes = async () => {};
}
const memes = new Memes();

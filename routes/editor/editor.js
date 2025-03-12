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
let currentMeme = emptyMeme;

window.initEditor = (route) => {
  let currentLoader = undefined;
  if (route.params && route.params.id) {
    try {
      currentLoader = fetch(
        "http://localhost:5679/memes/" + route.params.id
      ).then((r) => r.json());
      currentLoader.then((m) => {
        currentMeme = m;
        return currentMeme;
      });
    } catch (ex) {
      router.navigate("/editor");
      return;
    }
  } else {
    currentLoader = new Promise((r) => {
      currentMeme = emptyMeme;
      resolved(currentMeme);
    });
  }

  const formLoaderPromise = new Promise((resolved) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initForm("wrapper");
        resolved();
      });
    } else {
      initForm("wrapper");
      resolved();
    }
  }) 
  Promise.all([formLoaderPromise,currentLoader]).then(promisesCharges=>{
        fillForm(currentMeme);
  })
};

function initForm(contextId) {
  const form = document.querySelector(`#${contextId} form`);
  return promiseLoaderImages.then((imgs) => {
    const select = form["image"];
    select.innerHTML = "";
    imgs.forEach((img) => {
      const opt = document.createElement("option");
      opt.value = img.id;
      opt.innerHTML = img.name;
      select.appendChild(opt);
    });
    return images;
  });
}
function fillForm(meme=currentMeme) {
  const form = document.querySelector(`#${contextId} form`);
  form["image"].value=meme.imageId;
  form["text"].value=meme.text;
  form["text"].value=meme.text;

}

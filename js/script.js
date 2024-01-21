const colorThief = new ColorThief();
const img = document.querySelector("#imageURL");
const colorResult = document.querySelector("#colors");
const getURL = document.querySelector("#theURL");

//RGB to HEX
const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

// Gerar cor principal
function gerarCor() {
  colorResult.insertAdjacentHTML(
    "beforeend",
    `<div style='background: rgb(${colorThief.getColor(img)})'>
    Cor principal:
    ${rgbToHex(
      colorThief.getColor(img)[0],
      colorThief.getColor(img)[1],
      colorThief.getColor(img)[2]
    )}</div>`
  );
}

// Gerar paleta
function gerarPaleta() {
  colorThief.getPalette(img).forEach((rgb) => {
    let hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    colorResult.insertAdjacentHTML(
      "beforeend",
      `<div style='background: ${hex}'>${hex}</div>`
    );
  });
}

// Pra usar imagens de fora do domínio
function replaceImg(url) {
  let googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
  img.crossOrigin = "Anonymous";
  img.src = url ? googleProxyURL + encodeURIComponent(url) : "";
}

// Escuta mudanças no input
getURL.addEventListener("change", () => {
  const newImg = getURL.value;
  if (newImg !== "") {
    replaceImg(newImg);
  }
});

img.addEventListener("load", () => {
  colorResult.innerHTML = "";
  document.querySelector(
    ".canva__blur"
  ).style.backgroundImage = `url(${img.src})`;
  gerarCor();
  gerarPaleta();
  gerarImagem();
});

// Drag and drop
function dragNdrop(event) {
  const fileName = URL.createObjectURL(event.target.files[0]);
  img.src = fileName;
}

function drag() {
  document.getElementById("uploadFile").parentNode.className =
    "draging dragBox";
}
function drop() {
  document.getElementById("uploadFile").parentNode.className = "dragBox";
}

// Canvas
const node = document.querySelector("#canva");

// domtoimage.toPng(node)
function gerarImagem() {
  document.querySelector("#resultIMG").innerHTML = "";
  domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      const imagem = new Image();
      imagem.src = dataUrl;
      document.querySelector("#resultIMG").appendChild(imagem);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

const colorThief = new ColorThief();
const img = document.querySelector(".canva__image");
const colorResult = document.querySelector(".colors__result");
const getURL = document.querySelector(".url__input");
const imageResult = document.querySelector(".image__result");
const canva = document.querySelector("#canva");
const canvaBackgroundImagem = document.querySelector(".canva__blur");
const colorItem = document.querySelectorAll(".colors__item");

// Converter RGB to HEX
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
    `<div class='colors__item rounded-full mx-1.5' style='background: rgb(${colorThief.getColor(
      img
    )})'></div>`
  );
  canva.style.background = `rgb(${colorThief.getColor(img)})`;
}

// Gerar paleta
function gerarPaleta() {
  colorThief.getPalette(img).forEach((rgb) => {
    let hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    colorResult.insertAdjacentHTML(
      "beforeend",
      `<div class='colors__item rounded-full mx-1.5' style='background: ${hex}'
      onClick="mudarCor('${hex}')"'
      ></div>`
    );
  });
}

// Usar imagens de fora do domínio
function replaceImg(url) {
  let googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
  img.crossOrigin = "Anonymous";
  img.src = url ? googleProxyURL + encodeURIComponent(url) : "";
}

// Escuta mudanças no input
getURL.addEventListener("input", () => {
  const newImg = getURL.value;
  if (newImg !== "") {
    replaceImg(newImg);
  }
});

// Executa os geradores
img.addEventListener("load", () => {
  colorResult.innerHTML = "";
  document.querySelector(
    ".canva__blur"
  ).style.backgroundImage = `url(${img.src})`;
  gerarCor();
  gerarPaleta();
});
gerarCor();
gerarPaleta();

// Drag and drop
function dragNdrop(event) {
  const fileName = URL.createObjectURL(event.target.files[0]);
  img.src = fileName;
}

function drag() {
  document.getElementById("uploadFile").parentcanva.className =
    "draging dragBox";
}
function drop() {
  document.getElementById("uploadFile").parentcanva.className = "dragBox";
}

//Background image
const checkbox = document.querySelector(".option__image");
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    canvaBackgroundImagem.classList.remove("hidden");
  } else {
    canvaBackgroundImagem.classList.add("hidden");
  }
});

// domtoimage.toPng(canva)
function gerarImagem() {
  imageResult.innerHTML = "";
  domtoimage
    .toPng(canva)
    .then(function (dataUrl) {
      const imagem = new Image();
      imagem.src = dataUrl;
      imageResult.appendChild(imagem);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

//domtoimage
document.querySelector(".download__img__btn").addEventListener("click", () => {
  domtoimage.toBlob(imageResult).then(function (blob) {
    window.saveAs(blob, "my-node.png");
  });
});

//Botão geradar
document.querySelector(".gerar__img__btn").addEventListener("click", () => {
  gerarImagem();
});

// Mudar cor do canva
function mudarCor(item) {
  canva.style.background = item;
}

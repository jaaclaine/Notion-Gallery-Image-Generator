const colorThief = new ColorThief();
const img = document.querySelector(".canva__image");
const colorResult = document.querySelector(".colors__result");
const getURL = document.querySelector(".url__input");
const imageResult = document.querySelector(".image__result");
const canva = document.querySelector("#canva");
const canvaBackgroundContainer = document.querySelector(
  ".canva__blur__container"
);
const canvaBackgroundImagem = document.querySelector(".canva__blur");
const colorItem = document.querySelectorAll(".colors__item");

// Imagem de exemplo
const imgExemplo = [
  "./img/Bring_Me_the_Horizon-Post_Human_Survival_Horror.jpg",
  "./img/DPR_IAN-Moodswings_in_This_Order.jpg",
  "./img/EXO-The_War_The_Power_of_Music.jpg",
  "./img/Interpol-Our_Love_to_Admire.jpg",
  "./img/Kali_Uchis-Orquideas.jpg",
  "./img/TWICE-Perfect_World.jpg",
];
let imgExemploItem = Math.floor(Math.random() * imgExemplo.length);
img.src = imgExemplo[imgExemploItem];

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
  let color = colorThief.getColor(img);
  colorResult.insertAdjacentHTML(
    "beforeend",
    `<div class='colors__item rounded-full mx-1.5 transition cursor-pointer' style='background: rgb(${colorThief.getColor(
      img
    )})' onClick="mudarCor('${rgbToHex(
      color[0],
      color[1],
      color[2]
    )}')">  </div>`
  );
  canva.style.background = `rgb(${colorThief.getColor(img)})`;
}

// Gerar paleta
function gerarPaleta() {
  colorThief.getPalette(img).forEach((rgb) => {
    let hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    colorResult.insertAdjacentHTML(
      "beforeend",
      `<div class='colors__item rounded-full mx-1.5 transition cursor-pointer' style='background: ${hex}'
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
  canvaBackgroundImagem.style.backgroundImage = `url(${img.src})`;
  canvaBackgroundContainer.style.backgroundImage = `url(${img.src})`;
  gerarCor();
  gerarPaleta();
});

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
document.querySelector(".option__image").addEventListener("change", () => {
  if (document.querySelector(".option__image").checked) {
    canvaBackgroundContainer.classList.remove("hidden");
  } else {
    canvaBackgroundContainer.classList.add("hidden");
  }
});

//Border image
document.querySelector(".option__border").addEventListener("change", () => {
  if (document.querySelector(".option__border").checked) {
    img.classList.add("border");
    img.classList.add("border-black");
  } else {
    img.classList.remove("border");
    img.classList.remove("border-black");
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
  document.querySelector(".final__image").classList.remove("hidden");
  gerarImagem();
});

// Mudar cor do canva
function mudarCor(item) {
  canva.style.background = item;
}

// Manter a imagem no centro
let valor =
  (1500 - document.querySelector(".canva__container").clientWidth) / 2;
document.querySelector(".canva__container").scrollLeft += valor;

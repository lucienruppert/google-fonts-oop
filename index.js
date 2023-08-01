import FontService from "./FontService.js";

const input = document.querySelector("input");
const changingText = document.querySelector(".changing-text");

function insertDataListFor(googleFonts) {
  const datalist = document.querySelector(".datalist");
  googleFonts.forEach((font) => {
    const option = document.createElement("option");
    option.value = font.family;
    datalist.appendChild(option);
  });
}

function addEventListenerToInput(googleFonts, fontService) {
  input.addEventListener("input", (event) => {
    const selectedFont = googleFonts.find(
      (fontObject) => fontObject.family === event.target.value
    );
    if (selectedFont) {
      fontService.insertFontToHead(selectedFont);
      changingText.style.fontFamily = `${selectedFont.family}, ${selectedFont.category}`;
      event.target.value = "";
    }
  });
}

const fontService = new FontService();
async function initFontPicker(fontService) {
  const googleFonts = await fontService.getGoogleFonts();
  insertDataListFor(googleFonts);
  addEventListenerToInput(googleFonts, fontService);
}

initFontPicker(fontService);
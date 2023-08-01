export default class FontService {
  async #fetchGoogleFonts() {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=AIzaSyCBeWBsvyXQ4nemkkodNU2FVNiTcA0SpX8`
    );
    const data = await response.json();
    return data;
  }

  insertFontToHead(fontObject) {
    this.insertElementFontStyles();
    const styleElement = document.querySelector("style.font-styles");
    const importRule = `@import url("https://fonts.googleapis.com/css2?family=${fontObject.family}&display=swap");`;
    if (!styleElement.innerText.includes(importRule))
    styleElement.appendChild(document.createTextNode(importRule));
  // styleElement.innerHTML += '\n' + importRule
  }

  insertElementFontStyles() {
    if (document.querySelector("style.font-styles")) return;
    const styleElement = document.createElement("style");
    styleElement.classList.add("font-styles");
    document.head.appendChild(styleElement);
  }

  async getGoogleFonts() {
    const fetchedData = await this.#fetchGoogleFonts();
    return fetchedData.items.map((font) => ({
      family: font.family,
      category: font.category,
    }));
  }
}

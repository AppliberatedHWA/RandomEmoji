"use strict";

import Utils from "/js/utils.js";

(function App() {

    let emojiLoaded = false;
    let emojiData;
    let emojiSection = document.getElementById("emoji-section");
    let emojiWrapper = document.getElementById("emoji-wrapper");
 
    let emojiNameElement = document.getElementById("emoji-name");
    let emojiSizeInput = document.getElementById("emoji-size");
    const colorButtonGroup = document.querySelector(".apl-color-button-group");
    const customColorButton = document.getElementById("custom-color-button");
    
    

    function nextRandomEmoji() {
        if (!emojiLoaded) return;

        let index = Utils.getRandomInt(0, emojiData.length);
        emojiWrapper.innerHTML = twemoji.parse(emojiData[index].e, { folder: "svg", ext: ".svg" });
        emojiWrapper.dataset.shortName = emojiData[index].n;
        // emojiSection.style.backgroundColor = Utils.getRandomColor();
        emojiNameElement.innerText = emojiData[index].n;
    }

    function handleEmojiSizeInput() {
        emojiWrapper.style.maxWidth = emojiWrapper.style.maxHeight = `${emojiSizeInput.value}%`;
    }

    function onColorItemClick(event) {
        if (event.target.matches("button")) {
            emojiSection.style.backgroundColor = window.getComputedStyle(event.target).getPropertyValue("background-color");
            Array.from(colorButtonGroup.children, item => item.classList.remove("apl-color-button--active"));
            event.target.classList.add("apl-color-button--active");
        }
    }

    function onCustomColorInput(event) {
        customColorButton.style.backgroundColor = event.target.value;
        event.target.classList.add("apl-color-button--active");
        customColorButton.click();
    }

    function initEvents() {
        colorButtonGroup.addEventListener("click", onColorItemClick);
        
        const customColorInput = document.getElementById("custom-color");
        customColorInput.addEventListener("change", onCustomColorInput);
    }

    fetch("/js/emoji.json")
        .then((response) => response.json())
        .then((data) => {
            emojiData = data;
            emojiLoaded = true;
            nextRandomEmoji();
        });

    emojiWrapper.addEventListener("dblclick", () => nextRandomEmoji());
    emojiSizeInput.addEventListener("input", handleEmojiSizeInput);

    initEvents();

}());

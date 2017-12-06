"use strict";

import Utils from "/js/utils.js";

(function App() {

    let emojiLoaded = false;
    let emojiData;
    let emojiElement = document.getElementById("random-emoji");
    let emojiNameElement = document.getElementById("emoji-name");

    function nextRandomEmoji() {
        if (!emojiLoaded) return;

        let index = Utils.getRandomInt(0, emojiData.length);
        emojiElement.innerHTML = twemoji.parse(emojiData[index].e, { folder: "svg", ext: ".svg" });
        emojiElement.dataset.shortName = emojiData[index].n;
        document.body.style.backgroundColor = Utils.getRandomColor();
        emojiNameElement.innerText = emojiData[index].n;
        emojiNameElement.classList.remove("visible");
    }

    function showEmojiName(event) {
        event.preventDefault();
        emojiNameElement.classList.toggle("visible");
    }

    fetch("/js/emoji.json")
        .then((response) => response.json())
        .then((data) => {
            emojiData = data;
            emojiLoaded = true;
            nextRandomEmoji();
        });

    emojiElement.addEventListener("contextmenu", showEmojiName);
    emojiElement.addEventListener("dblclick", () => nextRandomEmoji());

}());

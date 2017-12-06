"use strict";

import Utils from "/js/utils.js";

(function App() {

    let emojiLoaded = false;
    let emojiData;
    let emojiElement = document.getElementById("random-emoji");

    function nextRandomEmoji() {
        if (!emojiLoaded) return;

        let index = Utils.getRandomInt(0, emojiData.length);
        emojiElement.innerHTML = twemoji.parse(emojiData[index].e, { folder: "svg", ext: ".svg" });
    }

    fetch("/js/emoji.json")
        .then((response) => response.json())
        .then((data) => {
            emojiData = data;
            emojiLoaded = true;
            nextRandomEmoji();
        });

    emojiElement.addEventListener("dblclick", () => nextRandomEmoji());

}());

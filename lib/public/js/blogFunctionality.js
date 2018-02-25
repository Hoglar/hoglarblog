"use strict";

window.onload = function () {
    var glossarySegment = document.getElementById("glossarySegment");
    var glossaryButton = document.getElementById("glossaryButton");

    document.getElementById("glossaryButton").addEventListener("click", function () {

        var div = document.createElement("div");
        div.id = "glossarySticker";
        glossarySegment.appendChild(div);
        document.getElementById("footerBlock-1").removeChild(glossaryButton);
    });
};
"use strict";

export default function boxColorChange(boxId) {
    // This function gets the name of the box and not the ID, we need to make it into a valid id.
    let Id = "sideBarBox" + boxId;
    let element = document.getElementById(Id);

    if (element.classList.contains("activeBox")) {
        element.classList.remove("activeBox");
    }
    else {
        element.classList.add("activeBox");
    }
}

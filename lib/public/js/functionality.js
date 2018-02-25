"use strict";

window.onload = function () {

    var checklistItems = document.getElementsByClassName("checklistItemBox");
    var checklistSubtask = document.getElementsByClassName("checklistSubtask");
    var todoAddItemButton = document.getElementById("addItem");
    var todoInputSection = document.getElementsByClassName("todoInputSection")[0];

    var todoInputPassword = document.getElementById("todoInputPassword");
    var todoSubmitButton = document.getElementsByClassName("todoSubmitButton")[0];

    // This loop add functionality for the subtask button so that i can click it to show items.
    for (var i = 0; i < checklistItems.length; i++) {

        checklistItems[i].children[0].children[1].children[0].addEventListener("click", bindClick(i));
    }

    // This is for the new task button, i want to keep the input fields hidden.
    todoAddItemButton.addEventListener("click", function () {
        if (todoInputSection.style.display == "none") {
            todoInputSection.style.display = "flex";
        } else {
            todoInputSection.style.display = "none";
        }
    });

    // I want to make it so that when i type in my password the button will show when i have typed 6 chars.

    todoInputPassword.addEventListener("input", function () {
        todoSubmitButton.style.display = "block";
    });

    function bindClick(i) {
        return function () {
            if (checklistSubtask[i].style.display == "none") {
                checklistSubtask[i].style.display = "block";
            } else {
                checklistSubtask[i].style.display = "none";
            }
        };
    };
};
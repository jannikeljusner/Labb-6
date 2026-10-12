"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jannike Ljusner
 */

const formElement = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorText = document.querySelector("#error");

// 2. Lyssna på formuläret
formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchWord = searchInput.value;

  if (searchWord === "") errorText.textContent = "Du måste fylla i ett sökord!";
});

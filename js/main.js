"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jannike Ljusner
 */

const formElement = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorText = document.querySelector("#error");
const recipeContainer = document.querySelector("#recipe");

// Lyssna på formuläret när någon klickar på sök
formElement.addEventListener("submit", async function (event) {
  // Stoppa sidan från att laddas om
  event.preventDefault();

  // Hämta texten användaren skrev i sökfältet
  const searchWord = searchInput.value;

  // Validering: Kontrollera om sökfältet är tomt
  if (searchWord === "") {
    errorText.textContent = "Du måste fylla i ett sökord!";
  } else {
    // Töm eventuella gamla felmeddelanden
    errorText.textContent = "";

    // 1. Skicka förfrågan till webbtjänsten med användarens sökord
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchWord,
    );

    // 2. Tolka svaret från JSON till ett JavaScript-objekt
    const data = await response.json();

    // 3. Plocka ut det allra första receptet (nummer 0) från listan
    const firstRecipe = data.recipes[0];

    // 4. Bygg HTML-koden och skicka ut den 
    recipeContainer.innerHTML = `
      <article>
          <h3>${firstRecipe.name}</h3>
          <img src="${firstRecipe.image}" alt="Bild på maten">
          
          <div class="recipe-info">
              <p><strong>Servings:</strong> ${firstRecipe.servings}</p>
              <p><strong>Prep time:</strong> ${firstRecipe.prepTimeMinutes} minutes</p>
              <p><strong>Cooking time:</strong> ${firstRecipe.cookTimeMinutes} minutes</p>
              <p><strong>Difficulty:</strong> ${firstRecipe.difficulty}</p>
          </div>
      </article>
    `;
});

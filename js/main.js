"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jannike Ljusner
 */

const formElement = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorText = document.querySelector("#error");
const recipeContainer = document.querySelector("#recipe");

// Lyssna på formuläret vid sökning
formElement.addEventListener("submit", async function (event) {
  // Stoppa sidan från att laddas om
  event.preventDefault();

  // Spara ordet som skrivs i sökfältet
  const searchWord = searchInput.value;

  // Kolla om sökfältet är tomt
  if (searchWord === "") {
    errorText.textContent = "Du måste fylla i ett sökord!";
  } else {
    // Ta bort gamla felmeddelanden
    errorText.textContent = "";

    // Hämta data från API med sökord
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchWord,
    );

    // Gör om svaret till ett objekt
    const data = await response.json();

    // Plocka ut det första receptet ur listan
    const firstRecipe = data.recipes[0];

    // Skriv ut i konsolen för att dubbelkolla datan
    console.log(firstRecipe);

    // Skapa en tom låda och loopa fram ingredienserna
    let ingredientsHTML = "";
    for (const ingredient of firstRecipe.ingredients) {
      ingredientsHTML += `<li>${ingredient}</li>`;
    }

    // Skapa en tom låda och loopa fram instruktionerna
    let instructionsHTML = "";
    for (const instruction of firstRecipe.instructions) {
      instructionsHTML += `<li>${instruction}</li>`;
    }

    // Bygg ihop all HTML och skicka ut på sidan
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

          <h4>Ingredients</h4>
          <ul>
              ${ingredientsHTML}
          </ul>

          <h4>Instructions</h4>
          <ol>
              ${instructionsHTML}
          </ol>
      </article>
    `;
  }
});

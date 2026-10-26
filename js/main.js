"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jannike Ljusner
 */

const formElement = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorText = document.querySelector("#error");
const recipeContainer = document.querySelector("#recipe");
const messageSection = document.querySelector("#message");

// Lyssna på formuläret vid sökning
formElement.addEventListener("submit", async function (event) {
  // Stoppa sidan från att laddas om
  event.preventDefault();

  // Spara ordet jag skrev i sökfältet (och ta bort osynliga mellanslag)
  const searchWord = searchInput.value.trim();

  // Kolla om sökfältet är tomt
  if (searchWord === "") {
    errorText.textContent = "Du måste fylla i ett sökord!";
    recipeContainer.innerHTML = "";
    messageSection.innerHTML = "";
  } else {
    // Ta bort gamla felmeddelanden från skärmen
    errorText.textContent = "";
    messageSection.innerHTML = "";

    // Försök hämta data från API:et
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes/search?q=" + searchWord,
      );

      // Kolla om HTTP-svaret var OK. Annars avbryt och kasta ett fel ner till catch.
      if (!response.ok) {
        throw new Error(
          "Något gick fel med servern, status: " + response.status,
        );
      }

      // Gör om svaret till ett objekt
      const data = await response.json();

      // Kolla om API:et skickade tillbaka en tom lista (inga recept hittades)
      if (data.recipes.length === 0) {
        messageSection.innerHTML =
          "<p>Hittade tyvärr inga recept på det sökordet.</p>";
        recipeContainer.innerHTML = ""; // Töm bort gamla recept från skärmen
        return; // Avbryt koden här!
      }

      // Plocka ut det första receptet ur listan
      const firstRecipe = data.recipes[0];
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
    } catch (error) {
      // Hit hoppar koden om något kraschar (t.ex. internet ligger nere)
      messageSection.innerHTML =
        "<p>Något gick fel, kunde inte hämta data. Kolla din uppkoppling.</p>";
      recipeContainer.innerHTML = ""; // Töm bort eventuella gamla recept
    }
  }
});

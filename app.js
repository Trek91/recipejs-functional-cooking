const RecipeApp = (function () {

  // ===============================
  // State
  // ===============================
  let currentFilter = "all";
  let currentSort = null;

  // ===============================
  // Recipe Data (Enhanced)
  // ===============================
  const recipes = [
    {
      id: 1,
      title: "Garlic Butter Pasta",
      time: 20,
      difficulty: "easy",
      description: "Quick pasta tossed in garlic butter and herbs.",
      category: "pasta",
      ingredients: [
        "Pasta",
        "Garlic",
        "Butter",
        "Salt",
        "Herbs"
      ],
      steps: [
        "Boil water",
        "Cook pasta",
        {
          step: "Prepare garlic butter",
          substeps: [
            "Heat butter",
            "Add garlic",
            {
              step: "Finish sauce",
              substeps: [
                "Add herbs",
                "Mix pasta with sauce"
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 65,
      difficulty: "medium",
      description: "Spiced chicken curry cooked with onions and tomatoes.",
      category: "curry",
      ingredients: [
        "Chicken",
        "Onion",
        "Tomato",
        "Spices",
        "Oil"
      ],
      steps: [
        "Heat oil",
        {
          step: "Prepare masala",
          substeps: [
            "Add onions",
            "Cook until golden",
            {
              step: "Add tomatoes and spices",
              substeps: [
                "Add tomatoes",
                "Add spices",
                "Cook until oil separates"
              ]
            }
          ]
        },
        "Add chicken",
        "Simmer until cooked"
      ]
    },
    {
      id: 3,
      title: "Avocado Salad Bowl",
      time: 15,
      difficulty: "easy",
      description: "Fresh avocado salad with lemon dressing and veggies.",
      category: "salad",
      ingredients: ["Avocado", "Lettuce", "Lemon", "Salt"],
      steps: ["Chop vegetables", "Mix dressing", "Combine everything"]
    },
    {
      id: 4,
      title: "Paneer Butter Masala",
      time: 50,
      difficulty: "medium",
      description: "Creamy tomato gravy with soft paneer cubes.",
      category: "curry",
      ingredients: ["Paneer", "Butter", "Tomato", "Cream"],
      steps: ["Prepare gravy", "Add paneer", "Simmer and serve"]
    },
    {
      id: 5,
      title: "Beef Stew",
      time: 120,
      difficulty: "hard",
      description: "Slow-cooked stew with tender beef and vegetables.",
      category: "stew",
      ingredients: ["Beef", "Carrot", "Potato", "Spices"],
      steps: ["Brown beef", "Add vegetables", "Slow cook"]
    },
    {
      id: 6,
      title: "Veggie Fried Rice",
      time: 25,
      difficulty: "easy",
      description: "Fast fried rice with mixed vegetables and soy sauce.",
      category: "rice",
      ingredients: ["Rice", "Vegetables", "Soy Sauce"],
      steps: ["Cook rice", "Stir fry veggies", "Mix rice and sauce"]
    },
    {
      id: 7,
      title: "Lasagna",
      time: 90,
      difficulty: "hard",
      description: "Layered pasta bake with sauce, cheese, and filling.",
      category: "pasta",
      ingredients: ["Lasagna sheets", "Sauce", "Cheese"],
      steps: ["Prepare sauce", "Layer ingredients", "Bake"]
    },
    {
      id: 8,
      title: "Chocolate Lava Cake",
      time: 40,
      difficulty: "hard",
      description: "Rich cake with a gooey molten chocolate center.",
      category: "dessert",
      ingredients: ["Chocolate", "Butter", "Flour", "Eggs"],
      steps: ["Prepare batter", "Bake briefly", "Serve warm"]
    }
  ];

  // ===============================
  // DOM Selection
  // ===============================
  const recipeContainer = document.querySelector("#recipe-container");

  // ===============================
  // Create Recipe Card
  // ===============================
  const createRecipeCard = (recipe) => {
    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>

        <div class="recipe-meta">
          <span>⏱️ ${recipe.time} min</span>
          <span class="difficulty ${recipe.difficulty}">
            ${recipe.difficulty}
          </span>
        </div>

        <p>${recipe.description}</p>

        <button class="toggle-ingredients">Show Ingredients</button>
        <button class="toggle-steps">Show Steps</button>

        <div class="ingredients hidden"></div>
        <div class="steps hidden"></div>
      </div>
    `;
  };

  // ===============================
  // Render Recipes
  // ===============================
  const renderRecipes = (list) => {
    recipeContainer.innerHTML = list.map(createRecipeCard).join("");
  };

  // ===============================
  // Recursive Steps Renderer
  // ===============================
  const renderSteps = (steps) => {
    let html = "<ul>";

    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>${step.step}`;
        html += renderSteps(step.substeps);
        html += `</li>`;
      }
    });

    html += "</ul>";
    return html;
  };

  // ===============================
  // Ingredients Renderer
  // ===============================
  const renderIngredients = (ingredients) => {
    return `
      <ul>
        ${ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>
    `;
  };

  // ===============================
  // Event Delegation
  // ===============================
  const handleCardClick = (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;

    const recipeId = Number(card.dataset.id);
    const recipe = recipes.find(r => r.id === recipeId);

    if (e.target.classList.contains("toggle-steps")) {
      const stepsDiv = card.querySelector(".steps");
      stepsDiv.innerHTML = renderSteps(recipe.steps);
      stepsDiv.classList.toggle("hidden");
    }

    if (e.target.classList.contains("toggle-ingredients")) {
      const ingDiv = card.querySelector(".ingredients");
      ingDiv.innerHTML = renderIngredients(recipe.ingredients);
      ingDiv.classList.toggle("hidden");
    }
  };

  // ===============================
  // Filters & Sorting (UNCHANGED)
  // ===============================
  const filterByDifficulty = (list, level) => {
    if (level === "all") return list;
    return list.filter(r => r.difficulty === level);
  };

  const filterQuickRecipes = (list) =>
    list.filter(r => r.time < 30);

  const sortByName = (list) =>
    [...list].sort((a, b) => a.title.localeCompare(b.title));

  const sortByTime = (list) =>
    [...list].sort((a, b) => a.time - b.time);

  const updateDisplay = () => {
    let result = recipes;

    if (currentFilter === "quick") {
      result = filterQuickRecipes(result);
    } else {
      result = filterByDifficulty(result, currentFilter);
    }

    if (currentSort === "name") {
      result = sortByName(result);
    } else if (currentSort === "time") {
      result = sortByTime(result);
    }

    renderRecipes(result);
  };

  // ===============================
  // Init
  // ===============================
  const init = () => {
    updateDisplay();
    recipeContainer.addEventListener("click", handleCardClick);

    document.querySelectorAll(".filters button").forEach(btn => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        updateDisplay();
      });
    });

    document.querySelectorAll(".sort button").forEach(btn => {
      btn.addEventListener("click", () => {
        currentSort = btn.dataset.sort;
        updateDisplay();
      });
    });
  };

  return { init };

})();

document.addEventListener("DOMContentLoaded", RecipeApp.init);

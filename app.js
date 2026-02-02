// ===============================
// Part 1: Static Recipe Data
// ===============================
const recipes = [
  {
    id: 1,
    title: "Garlic Butter Pasta",
    time: 20,
    difficulty: "easy",
    description: "Quick pasta tossed in garlic butter and herbs.",
    category: "pasta",
  },
  {
    id: 2,
    title: "Chicken Curry",
    time: 65,
    difficulty: "medium",
    description: "Spiced chicken curry cooked with onions and tomatoes.",
    category: "curry",
  },
  {
    id: 3,
    title: "Avocado Salad Bowl",
    time: 15,
    difficulty: "easy",
    description: "Fresh avocado salad with lemon dressing and veggies.",
    category: "salad",
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    time: 50,
    difficulty: "medium",
    description: "Creamy tomato gravy with soft paneer cubes.",
    category: "curry",
  },
  {
    id: 5,
    title: "Beef Stew",
    time: 120,
    difficulty: "hard",
    description: "Slow-cooked stew with tender beef and vegetables.",
    category: "stew",
  },
  {
    id: 6,
    title: "Veggie Fried Rice",
    time: 25,
    difficulty: "easy",
    description: "Fast fried rice with mixed vegetables and soy sauce.",
    category: "rice",
  },
  {
    id: 7,
    title: "Lasagna",
    time: 90,
    difficulty: "hard",
    description: "Layered pasta bake with sauce, cheese, and filling.",
    category: "pasta",
  },
  {
    id: 8,
    title: "Chocolate Lava Cake",
    time: 40,
    difficulty: "hard",
    description: "Rich cake with a gooey molten chocolate center.",
    category: "dessert",
  },
];

// ===============================
// DOM Selection
// ===============================
const recipeContainer = document.querySelector("#recipe-container");

// ===============================
// Create a recipe card (HTML)
// ===============================
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>

      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>

      <p>${recipe.description}</p>
    </div>
  `;
};

// ===============================
// Render recipes to the page
// ===============================
const renderRecipes = (recipeList) => {
  const cardsHTML = recipeList.map(createRecipeCard).join("");
  recipeContainer.innerHTML = cardsHTML;
};

// ===============================
// Initialize App
// ===============================
renderRecipes(recipes);

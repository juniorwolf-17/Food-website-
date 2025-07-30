document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");

    if (!recipeId) {
        document.getElementById("recipe-details").innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    try {
        const res = await fetch(`/recipes/${recipeId}`);
        const recipe = await res.json();

        // Set main data
        document.getElementById("recipe-title").textContent = recipe.title || "Untitled";
        document.getElementById("recipe-category").textContent = recipe.category || "N/A";
        document.getElementById("recipe-time").textContent = recipe.time || "Not mentioned";
        document.getElementById("recipe-rating").textContent = recipe.rating || "Not rated";
        document.getElementById("recipe-img").src = recipe.image || "default.jpg";

        // Ingredients + Quantity
        const ingredientsList = document.getElementById("recipe-ingredients");
        ingredientsList.innerHTML = "";

        if (Array.isArray(recipe.ingredients) && Array.isArray(recipe.quantity)) {
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const li = document.createElement("li");
                const qty = recipe.quantity[i] || "";
                li.textContent = `${recipe.ingredients[i]} - ${qty}`;
                ingredientsList.appendChild(li);
            }
        } else {
            recipe.ingredients.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                ingredientsList.appendChild(li);
            });
        }

        // Instructions
        const instructionDiv = document.getElementById("recipe-instructions");
        instructionDiv.innerHTML = "";

        if (Array.isArray(recipe.instructions)) {
            recipe.instructions.forEach((step, index) => {
                if (step.trim()) {
                    const p = document.createElement("p");
                    p.textContent = `${index + 1}. ${step.trim()}`;
                    instructionDiv.appendChild(p);
                }
            });
        } else if (typeof recipe.instructions === "string") {
            recipe.instructions.split(".").forEach((step, index) => {
                if (step.trim()) {
                    const p = document.createElement("p");
                    p.textContent = `${index + 1}. ${step.trim()}`;
                    instructionDiv.appendChild(p);
                }
            });
        }

    } catch (err) {
        console.error("Error fetching recipe:", err);
        document.getElementById("recipe-details").innerHTML = "<p>Error loading recipe.</p>";
    }
});

// Back button
function goBack() {
    window.history.back();
}

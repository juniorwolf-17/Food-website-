// async function fetchRecipes() {
//     const ingredient = document.getElementById("ingredient").value;
//     const category = document.getElementById("category").value;
    
//     let url = "http://localhost:5500/recipes";
    
//     // ✅ Append filters if user selects ingredient or category
//     if (ingredient || category) {
//         url += "?";
//         if (ingredient) url += `ingredient=${ingredient}&`;
//         if (category) url += `category=${category}`;
//     }

//     try {
//         let response = await fetch(url);
//         let recipes = await response.json();

//         displayRecipes(recipes);
//     } catch (error) {
//         console.error("Error fetching recipes:", error);
//         document.getElementById("recipes-container").innerHTML = "<p>Error loading recipes.</p>";
//     }
// }

// // ✅ Function to display recipes in UI
// function displayRecipes(recipes) {
//     const container = document.getElementById("recipes-container");
//     container.innerHTML = ""; // Clear previous results

//     if (recipes.length === 0) {
//         container.innerHTML = "<p>No recipes found.</p>";
//         return;
//     }

//     recipes.forEach(recipe => {
//         let recipeDiv = document.createElement("div");
//         recipeDiv.classList.add("recipe");
//         recipeDiv.innerHTML = `
//             <h3>${recipe.title}</h3>
//             <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
//             <p><strong>Instructions:</strong> ${recipe.instructions}</p>
//             <p><strong>Category:</strong> ${recipe.category}</p>
//         `;
//         container.appendChild(recipeDiv);
//     });
// }

// // ✅ Run fetchRecipes() on page load to show all recipes
// document.addEventListener("DOMContentLoaded", fetchRecipes);

// async function fetchRecipes() {
//     const ingredientInput = document.getElementById("ingredient").value;
//     const category = document.getElementById("category").value;

//     let url = "http://localhost:5500/recipes";

//     // ✅ Add multiple ingredients to URL if entered
//     if (ingredientInput || category) {
//         url += "?";
//         if (ingredientInput) url += `ingredient=${encodeURIComponent(ingredientInput)}&`;
//         if (category) url += `category=${encodeURIComponent(category)}`;
//     }

//     try {
//         let response = await fetch(url);
//         let recipes = await response.json();

//         displayRecipes(recipes);
//     } catch (error) {
//         console.error("Error fetching recipes:", error);
//         document.getElementById("recipes-container").innerHTML = "<p>Error loading recipes.</p>";
//     }
// }


async function fetchRecipes() {
    const ingredientInput = document.getElementById("ingredient").value;
    const category = document.getElementById("category").value;
    const checkboxes = document.querySelectorAll('input[name="ingredient"]:checked');

    // Collect checked ingredients from checkboxes
    const selectedIngredients = Array.from(checkboxes).map(cb => cb.value);

    // Combine typed and selected ingredients
    let allIngredients = [...selectedIngredients];
    if (ingredientInput.trim()) {
        allIngredients.push(ingredientInput.trim());
    }

    // ❗ If no filter is provided, stop here
    if (allIngredients.length === 0 && !category) {
        document.getElementById("recipes-container").innerHTML = "<p>Please enter at least one ingredient or choose a category.</p>";
        return;
    }

    let url = "http://localhost:5500/recipes?";
    if (allIngredients.length > 0) {
        url += `ingredient=${encodeURIComponent(allIngredients.join(","))}&`;
    }
    if (category) {
        url += `category=${encodeURIComponent(category)}`;
    }

    try {
        let response = await fetch(url);
        let recipes = await response.json();

        displayRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        document.getElementById("recipes-container").innerHTML = "<p>Error loading recipes.</p>";
    }
}







// // ✅ Function to display recipes in UI
// function displayRecipes(recipes) {
//     const container = document.getElementById("recipes-container");
//     container.innerHTML = ""; // Clear previous results

//     if (recipes.length === 0) {
//         container.innerHTML = "<p>No recipes found.</p>";
//         return;
//     }

//     recipes.forEach(recipe => {
//         let recipeDiv = document.createElement("div");
//         recipeDiv.classList.add("recipe");
//         recipeDiv.innerHTML = `
//             <h3>${recipe.title}</h3>
//             <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
//             <p><strong>Instructions:</strong> ${recipe.instructions}</p>
//             <p><strong>Category:</strong> ${recipe.category}</p>
//         `;
//         container.appendChild(recipeDiv);
//     });
// }

// // ✅ Run fetchRecipes() on page load to show all recipes
// document.addEventListener("DOMContentLoaded", fetchRecipes);



function displayRecipes(recipes) {
    const container = document.getElementById("recipes-container");
    container.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        // Make the entire div clickable
        recipeDiv.addEventListener("click", () => {
            // Redirect to detail page with recipe ID in URL
            window.location.href = `recipe.html?id=${recipe._id}`;
            // window.location.href = `recipe.html?id=${recipeID}`;

        });

        recipeDiv.style.cursor = "pointer"; // Show hand cursor on hover

        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <p><strong>Category:</strong> ${recipe.category}</p>
        `;

        container.appendChild(recipeDiv);
    });
}


window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5500/check-session", {
        credentials: "include"  // Important to send cookies!
    })
    .then(res => res.json())
    .then(data => {
        if (data.loggedIn) {
            document.getElementById("login-link").style.display = "none";
            document.getElementById("profile-link").style.display = "inline";
        } else {
            document.getElementById("login-link").style.display = "inline";
            document.getElementById("profile-link").style.display = "none";
        }
    })
    .catch(err => console.error("Session check error:", err));
});

// Save user info to localStorage
localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));


// 🔒 Logout logic
const logoutLink = document.getElementById("logout-link");
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:5500/logout", {
      method: "POST",
      credentials: "include"
    })
    .then(() => {
      localStorage.removeItem("user"); // Optional: Clear localStorage
      window.location.href = "index.html"; // Redirect to homepage
    })
    .catch(err => console.error("Logout error:", err));
  });
}

document.getElementById("uploadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePhoto", document.getElementById("profilePhotoInput").files[0]);
  
    fetch("http://localhost:5500/upload-profile-photo", {
      method: "POST",
      body: formData,
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("profile-photo").src = data.path;
      }
    })
    .catch(err => console.error("Upload error:", err));
  });
  
  document.getElementById("removePhoto").addEventListener("click", () => {
    fetch("http://localhost:5500/remove-profile-photo", {
      method: "POST",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("profile-photo").src = "default-user.png";
      }
    })
    .catch(err => console.error("Remove photo error:", err));
  });
  





// async function checkSession() {
//     try {
//         let response = await fetch("http://localhost:5500/session");
//         let data = await response.json();

//         const authContainer = document.getElementById("auth-container");

//         if (data.user) {
//             // User is logged in → Show Profile
//             authContainer.innerHTML = `
//                 <a href="profile.html">${data.users.username}</a> |
//                 <a href="#" onclick="logout()">Logout</a>
//             `;
//         } else {
//             // User is not logged in → Show Login/Signup
//             authContainer.innerHTML = `
//                 <a href="login.html">Login</a> |
//                 <a href="signup.html">Sign Up</a>
//             `;
//         }
//     } catch (error) {
//         console.error("Session check failed:", error);
//     }
// }

// **Logout Function**
// async function logout() {
//     try {
//         await fetch("http://localhost:5500/logout", { method: "POST" });
//         checkSession(); // Refresh navbar after logout
//     } catch (error) {
//         console.error("Logout failed:", error);
//     }
// }




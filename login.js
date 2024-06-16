let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// Function to open login popup
function openLoginPopup() {
  document.getElementById("login-popup").style.display = "block";
  if (isLoggedIn) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("logged-in-content").style.display = "block";
  } else {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("logged-in-content").style.display = "none";
  }
}

// Function to close login popup
function closeLoginPopup() {
  document.getElementById("login-popup").style.display = "none";
}

// Event listener for profile icon click
document
  .getElementById("profile-icon")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior of link
    openLoginPopup(); // Open the login popup
  });

// Function to verify login
function verifyLogin() {
  const phone = document.getElementById("phone-input").value;
  const password = document.getElementById("password-input").value;

  fetch("https://mock-server-api-wh0v.onrender.com/user")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((users) => {
      const user = users.find(
        (u) => u.mobilenumber === phone && u.password === password
      );

      if (user) {
        isLoggedIn = true; // Update login status
        localStorage.setItem("isLoggedIn", "true");
        closeLoginPopup(); // Close the login popup
        alert("Welcome to Food Mart"); // Display welcome message
        updateCartView(); // Update the cart view
      } else {
        alert("Invalid credentials. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("Error fetching user data. Please try again later.");
    });
}

// Function to logout
function logout() {
  isLoggedIn = false; // Update login status
  localStorage.setItem("isLoggedIn", "false");
  closeLoginPopup(); // Close the popup without showing the login form
  document.getElementById("phone-input").value = "";
  document.getElementById("password-input").value = "";
  updateCartView(); // Update the cart view
}

// Event listener for Continue button click
document
  .querySelector(".zepto-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior of button
    verifyLogin(); // Verify login details and show alert
  });

function updateCartView() {
  const loginToViewCart = document.getElementById("login-to-view-cart");
  const cartItems = document.getElementById("cart-items");

  if (isLoggedIn) {
    loginToViewCart.style.display = "none";
    cartItems.style.display = "block";
    displayCartItems(); // Display cart items
  } else {
    loginToViewCart.style.display = "block";
    cartItems.style.display = "none";
  }
}

// Ensure cart items are displayed on page load if the user is logged in
document.addEventListener("DOMContentLoaded", (event) => {
  updateCartView();
});

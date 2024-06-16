let isLoggedIn = false; // Flag to keep track of login status

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

  // Fetch user data from API
  fetch("https://mock-server-api-wh0v.onrender.com/user")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((users) => {
      // Find user with matching phone number and password
      const user = users.find(
        (u) => u.mobilenumber === phone && u.password === password
      );

      if (user) {
        isLoggedIn = true; // Update login status
        closeLoginPopup(); // Close the login popup
        alert("Welcome to Food Mart"); // Display welcome message
      } else {
        // Show error message or handle invalid login
        alert("Invalid credentials. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      // Handle errors here, e.g., display an error message
      alert("Error fetching user data. Please try again later.");
    });
}

// Function to logout
function logout() {
  isLoggedIn = false; // Update login status
  closeLoginPopup(); // Close the popup without showing the login form
  // Clear input fields
  document.getElementById("phone-input").value = "";
  document.getElementById("password-input").value = "";
}

// Event listener for Continue button click
document
  .querySelector(".zepto-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior of button
    verifyLogin(); // Verify login details and show alert
  });

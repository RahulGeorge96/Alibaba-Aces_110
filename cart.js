function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

// Function to update the quantity of a cart item
function updateQuantity(index, increment) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart[index];

  if (increment) {
    product.quantity += 1;
    product.costprice += product.unitprice;
  } else {
    if (product.quantity > 1) {
      product.quantity -= 1;
      product.costprice -= product.unitprice;
    } else {
      cart.splice(index, 1); // Remove the item if quantity becomes 0
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

// Function to display cart items
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  let totalAmount = 0; // Initialize total amount

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-message">
        <h3>Your cart is empty</h3>
        <button onclick="window.location.href='index.html'">Browse Products</button>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      item.unitprice = item.unitprice || item.costprice / item.quantity;
      item.costprice = item.costprice || item.unitprice * item.quantity;

      totalAmount += item.costprice; // Add item costprice to total amount

      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
        <img class="cartitemimg" src="${item.url}" alt="${item.productname}" />
        <div class="cart-item-details">
          <h2 class="cartitemname">${item.productname}</h2>
          <div class="quantity-control">
            <button onclick="updateQuantity(${index}, false); event.stopPropagation();">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, true); event.stopPropagation();">+</button>
          </div>
          <p>Price: ₹${item.costprice}</p>
        </div>
        <button class="remove-button" onclick="removeFromCart(${index}); event.stopPropagation();">Remove</button>
      `;
      cartContainer.appendChild(cartItemDiv);
    });

    // Create a div to display the total amount
    const totalAmountDiv = document.createElement("div");
    totalAmountDiv.className = "total-amount";
    totalAmountDiv.innerHTML = `
      <h3>Total Amount: ₹${totalAmount}</h3>
      <br/>
      <div style="display:flex; gap:5px">
        <div> <img src="https://www.zeptonow.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fjupdt2k6txi%2Fapp%2Fimages%2Ftip_icon.png&w=640&q=75" /></div>
        <div>
          <p style="font-weight:600">Delivery Partner Tip</p>
          <p> This amount goes to your delivery partner</p>
        </div>
      </div>
      <div style="display:flex;gap:5px">
        <div> <img src="https://www.zeptonow.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fjupdt2k6txi%2Fapp%2Fimages%2Finstructions_icon.png&w=640&q=75" /></div>
        <div>
          <p style="font-weight:600">Delivery Instructions</p>
          <p>Delivery partner will be notified</p>
        </div>
      </div>
      <div style="display:flex;gap:5px">
        <div> <img src="https://www.zeptonow.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fjupdt2k6txi%2Fapp%2Fimages%2Fbill_icon.png&w=640&q=75" /></div>
        <div>
          <p style="font-weight:600">To Pay ₹${totalAmount} </p>
          <p> Incl all taxes  and charges</p>
        </div>
      </div>
      <div>
        <div id="openDialog1">
          <div>Enter your delivery address</div>
          <button style="background-color: #ff3269; color:white;border:none; border-radius:5px;height:50px;margin-top:10px;" class="address1" onclick="openAddressModal()">Add Address To Proceed</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(totalAmountDiv);
  }
}

// Function to open address modal
function openAddressModal() {
  const modal = document.getElementById("addressModal");
  modal.style.display = "block";

  // Initialize Google Maps Places Autocomplete
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete")
  );
}

// Close the modal when clicking on <span> (x)
document.querySelector(".close").onclick = function () {
  document.getElementById("addressModal").style.display = "none";
};

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("addressModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle saving the address (add further logic as needed)
document.getElementById("saveAddress").onclick = function () {
  const address = document.getElementById("autocomplete").value;
  if (address) {
    // Logic to handle the saved address (e.g., storing it, updating UI, etc.)
    console.log("Address saved:", address);

    // Close the modal after saving
    document.getElementById("addressModal").style.display = "none";
  } else {
    alert("Please enter an address.");
  }
};

// Ensure cart items are displayed on page load if the user is logged in
document.addEventListener("DOMContentLoaded", (event) => {
  updateCartView();
});








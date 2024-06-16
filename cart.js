
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

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
      cart.splice(index, 1); 
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}



function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  let totalAmount = 0; 

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-message">
        <h3>Your cart is empty</h3>
        <button onclick="window.location.href='products.html'">Browse Products</button>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      item.unitprice = item.unitprice || item.costprice / item.quantity;
      item.costprice = item.costprice || item.unitprice * item.quantity;

      totalAmount += item.costprice; 
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

    
    const totalAmountDiv = document.createElement("div");
    totalAmountDiv.className = "total-amount";
    totalAmountDiv.innerHTML = `<h3>Total Amount: ₹${totalAmount}</h3>`;
    cartContainer.appendChild(totalAmountDiv);
  }
}


  displayCartItems();


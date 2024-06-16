async function fetchProducts() {
    const response = await fetch('https://mock-server-api-wh0v.onrender.com/products');
    const products = await response.json();
    return products;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.costprice += product.costprice;
    } else {
      product.quantity = 1;
      product.unitprice = product.costprice; // Save the unit price
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    console.log("Product added to cart:", product);
  }
        

function displayProduct(products) {
    const productsContainer = document.getElementById('productsForYou');
    productsContainer.innerHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div><img src="${product.url}" alt="${product.productname}" /></div>
            <div><h2>${product.productname}</h2></div>
            <div><p>${product.quantity}</p></div>
            <div><p class="price">₹${product.costprice}</p></div>
            <div><button>Add To Cart</button></div>
        `;


           const addToCartButton = productDiv.querySelector("button");
           addToCartButton.addEventListener("click", (event) => {
             event.stopPropagation();
             addToCart(product);
           });
           productDiv.addEventListener("click", () => {
             window.location.href = `product_detail.html?id=${product.id}`;
           });
        productsContainer.appendChild(productDiv);
    });
}
function displayPopular(products) {
    const popularContainer = document.getElementById('popularItems');
    popularContainer.innerHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div><img src="${product.url}" alt="${product.productname}" /></div>
            <div><h2>${product.productname}</h2></div>
            <div><p>${product.quantity}</p></div>
            <div><p>₹${product.costprice}</p></div>
            <div><button>Add To Cart</button></div>
        `;
        popularContainer.appendChild(productDiv);
    });
}

async function displayRandomProduct() {
    const products = await fetchProducts();
    const shuffledProducts = shuffleArray(products);
    const selectedProducts = shuffledProducts.slice(0, 5);
    displayProduct(selectedProducts);
}
async function displayRandomPopular() {
    const products = await fetchProducts();
    const shuffledProducts = shuffleArray(products);
    const selectedProducts = shuffledProducts.slice(0, 5);
    displayPopular(selectedProducts);
}
// Call the function to display random products
displayRandomProduct();
displayRandomPopular();
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

function displayProduct(products) {
    const productsContainer = document.getElementById('productsForYou');
    productsContainer.innerHTML = ''; // Clear previous content if any

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
        productsContainer.appendChild(productDiv);
    });
}

async function displayRandomProduct() {
    const products = await fetchProducts();
    const shuffledProducts = shuffleArray(products);
    const selectedProducts = shuffledProducts.slice(0, 5);
    displayProduct(selectedProducts);
}

// Call the function to display random products
displayRandomProduct();
         

async function fetchProducts() {
    const response = await fetch('https://mock-server-api-wh0v.onrender.com/products');
    const products = await response.json();
    return products;
}

function displayUniqueCategories(products) {
    const productsContainer = document.getElementById('exploreCategories');
    const categories = new Set(); 
    const uniqueProducts = [];

    products.forEach(product => {
        if (!categories.has(product.category)) {
            categories.add(product.category);
            uniqueProducts.push(product);
        }
    });

    uniqueProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'category-card';
        productDiv.innerHTML = `
            <div>
            <img src="${product.url}" alt="${product.productname}" />
            <h2>${product.category}</h2>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });
}

async function showCategories() {
    const products = await fetchProducts();
    displayUniqueCategories(products);
}

showCategories();

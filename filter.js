let products = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    fetch("https://mock-server-api-wh0v.onrender.com/products")
        .then(response => response.json())
        .then(data => {
            products = data;
            populateCategories();
        })
        .catch(error => console.error('Error fetching products:', error));
}

function populateCategories() {
    const categories = new Set();
    products.forEach(product => {
        categories.add(product.category);
    });

    const categoryGrid = document.getElementById("category-grid");
    categoryGrid.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.onclick = () => {
            document.querySelectorAll('#category-grid button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            populateSubcategories(category);
        };
        categoryGrid.appendChild(button);
    });
}

function populateSubcategories(selectedCategory) {
    const subcategories = new Set();
    products.forEach(product => {
        if (product.category === selectedCategory) {
            subcategories.add(product.subcategory);
        }
    });

    const subcategoryContainer = document.getElementById("subcategory-container");
    subcategoryContainer.classList.remove("hidden");

    const subcategoryGrid = document.getElementById("subcategory-grid");
    subcategoryGrid.innerHTML = '<button class="selected">All</button>';
    subcategories.forEach(subcategory => {
        const button = document.createElement("button");
        button.textContent = subcategory;
        button.onclick = () => {
            document.querySelectorAll('#subcategory-grid button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            filterProducts(selectedCategory, subcategory);
        };
        subcategoryGrid.appendChild(button);
    });

    filterProducts(selectedCategory, 'All');
}

function filterProducts(selectedCategory, selectedSubcategory) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = '';

    products.forEach(product => {
        if (
            product.category === selectedCategory &&
            (selectedSubcategory === 'All' || product.subcategory === selectedSubcategory)
        ) {
            const productElement = document.createElement("div");
            productElement.className = "product";
            productElement.innerHTML = `
                <img src="${product.url}" alt="${product.productname}">
                <h2>${product.productname}</h2>
                <p class="price">Price: ₹${product.costprice}</p>
            `;
            productList.appendChild(productElement);
        }
    });
}


        async function fetchProducts() {
            const response = await fetch('https://mock-server-api-wh0v.onrender.com/products');
            const products = await response.json();
            return products;
        }

        function addToCart(product) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.costprice += product.costprice;
            } else {
                product.quantity = 1;
                product.unitprice = product.costprice; // Save the unit price
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
              displayCartItems();
            console.log('Product added to cart:', product);

        }
        
        function displayProducts(products) {
            const productsContainer = document.getElementById('allProducts');
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
                const addToCartButton = productDiv.querySelector('button');
                addToCartButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    addToCart(product);
                });
                productDiv.addEventListener('click', () => {
                    window.location.href = `product_detail.html?id=${product.id}`;
                });
                productsContainer.appendChild(productDiv);
            });
        }

        async function init() {
            const products = await fetchProducts();
            displayProducts(products);
        }

        init();


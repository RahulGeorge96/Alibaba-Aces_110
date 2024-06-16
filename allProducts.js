
        let start = 0;
        const initialLoad = 30;
        const subsequentLoad = 10;
        let isLoading = false;
        let allProductsLoaded = false;
        let totalProducts = 120;

        async function fetchProducts(start, limit) {
            const response = await fetch(`https://mock-server-api-wh0v.onrender.com/products?_start=${start}&_limit=${limit}`);
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

        async function loadMoreProducts(limit) {
            if (isLoading || allProductsLoaded) return;
            isLoading = true;

            const products = await fetchProducts(start, limit);
            displayProducts(products);

            start += products.length;
            isLoading = false;

            if (start >= totalProducts || products.length < limit) {
                allProductsLoaded = true;
            }
        }

        function initInfiniteScrolling() {
            window.addEventListener('scroll', () => {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300 && !isLoading && !allProductsLoaded) {
                    loadMoreProducts(subsequentLoad);
                }
            });
        }

        async function init() {
            await loadMoreProducts(initialLoad);
            initInfiniteScrolling();
        }

        init();

        
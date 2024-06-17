
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    searchButton.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchResults.innerHTML = '<p>Please enter a search query.</p>';
            return;
        }

        fetch(`https://mock-server-api-wh0v.onrender.com/products?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
                searchResults.innerHTML = '<p>There was an error processing your search. Please try again.</p>';
            });
    }

    function displayResults(results) {
        const query = searchInput.value.trim();
        searchResults.innerHTML = ''; 

        const title = document.querySelector('.searchtitle');
        title.textContent = `Search results for "${query}"`;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }
        results.forEach(result => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <div><img src="${result.url}" alt="${result.productname}" /></div>
                <div><h2>${result.productname}</h2></div>
                <div><p>${result.quantity}</p></div>
                <div><p>₹${result.costprice}</p></div>
                <div><button>Add To Cart</button></div>
            `;
            const addToCartButton = productDiv.querySelector('button');
            addToCartButton.addEventListener('click', (event) => {
                event.stopPropagation();
                addToCart(result);
            });
            productDiv.addEventListener('click', () => {
                window.location.href = `product_detail.html?id=${result.id}`;
            });
            searchResults.appendChild(productDiv);
        });
    }
});

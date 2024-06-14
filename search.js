const placeholders = [
    "Search for Milk",
    "Search for bread",
    "Search for Chocolate",
    "Search for Fruits",
    "Search for Vegetables",
    "Search for Products"
];

let currentIndex = 0;
const searchInput = document.getElementById('search-input');

function changePlaceholder() {
    searchInput.setAttribute('placeholder', placeholders[currentIndex]);
    currentIndex = (currentIndex + 1) % placeholders.length;
}

setInterval(changePlaceholder, 2000); // Change placeholder every 2 seconds

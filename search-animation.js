document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const placeholders = [
        "Search for Milk",
        "Search for bread",
        "Search for Chocolate",
        "Search for Fruits",
        "Search for Vegetables",
        "Search for Products"
    ];
    let placeholderIndex = 0;

    function changePlaceholder() {
        searchInput.classList.remove('fade');
        setTimeout(() => {
            searchInput.setAttribute('placeholder', placeholders[placeholderIndex]);
            searchInput.classList.add('fade');
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        }, 50);
    }

    setInterval(changePlaceholder, 3000); 
    // function startPlaceholderAnimation() {
    //     placeholderInterval = setInterval(changePlaceholder, 3000);
    // }

    // function stopPlaceholderAnimation() {
    //     clearInterval(placeholderInterval);
    // }

    // searchInput.addEventListener('focus', stopPlaceholderAnimation);
    // searchInput.addEventListener('blur', startPlaceholderAnimation);

    // startPlaceholderAnimation();
});



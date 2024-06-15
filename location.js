let autocomplete;
        const addressSpan = document.querySelector('.address');
        const dialogOverlay = document.getElementById('dialogOverlay');
        const openDialogButton = document.getElementById('openDialog');
        const locationField = document.getElementById('locationField');

        // Initialize Google Maps Places Autocomplete
        function initAutocomplete() {
            autocomplete = new google.maps.places.Autocomplete(
                locationField,
                { types: ['geocode'] }
            );

            autocomplete.addListener('place_changed', onPlaceChanged);
        }

        // Update the address span with the selected place
        function onPlaceChanged() {
            const place = autocomplete.getPlace();
            if (place.address_components) {
                addressSpan.textContent = place.formatted_address;
                closeDialog();
            } else {
                addressSpan.textContent = 'No details available for input: \'' + place.name + '\'';
            }
        }

        // Show the dialog box when the button is clicked
        openDialogButton.addEventListener('click', () => {
            dialogOverlay.style.display = 'flex';
            locationField.value = ''; // Clear previous input
            locationField.focus(); // Focus on input for better UX
        });

        // Close the dialog box
        function closeDialog() {
            dialogOverlay.style.display = 'none';
        }

        // Event listener for search button inside the dialog
        document.getElementById('searchLocation').addEventListener('click', () => {
            google.maps.event.trigger(autocomplete, 'place_changed');
        });

        // Initialize autocomplete on page load
        document.addEventListener('DOMContentLoaded', initAutocomplete);
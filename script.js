document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    function scrollToSection(event) {
        event.preventDefault();

        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    }
});



function createMarker(map, latitude, longitude, title, color) {
    // Create a marker for the specified location with a custom color
    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: title,
        icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`, // Customize the icon color
    });

    // Add an info window to the marker
    const infoWindow = new google.maps.InfoWindow({
        content: title,
    });

    // Open the info window when the marker is clicked
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

function findNearbyContacts(type) {
    const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Default location (San Francisco, CA)

    // Construct Google Maps URL with the predefined location and search query
    const googleMapsUrl = `https://www.google.com/maps/search/${type}/@${defaultLocation.lat},${defaultLocation.lng}`;

    // Open the Google Maps URL in a new tab/window
    const newTab = window.open();
    newTab.opener = null; // Ensure the new tab has no access to the opener (your page)
    newTab.location = googleMapsUrl;
}


function exploreNearby(type) {
    if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' })
            .then(permissionStatus => {
                if (permissionStatus.state === 'granted') {
                    getAndExploreLocation(type);
                } else if (permissionStatus.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(
                        () => {
                            getAndExploreLocation(type);
                        },
                        (error) => {
                            console.error(`Error getting location: ${error.message}`);
                        }
                    );
                } else {
                    alert('Geolocation permission denied. Please enable it in your browser settings.');
                }
            })
            .catch(error => {
                console.error(`Error checking geolocation permission: ${error.message}`);
            });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function getAndExploreLocation(type) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');

        // Rest of the code to create markers and map as before...
    }, (error) => {
        console.error(`Error getting location: ${error.message}`);
    });
}

function redirectToGoogleMaps(type) {
            const predefinedLocation = { lat: 37.7749, lng: -122.4194 }; // Default location (San Francisco, CA)
            const googleMapsUrl = `https://www.google.com/maps/search/${type}/@${predefinedLocation.lat},${predefinedLocation.lng}`;

            window.open(googleMapsUrl, '_blank');
        }


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

function exploreNearby(type) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
			
			// Construct Google Maps URL with the live location
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

            // Open the Google Maps URL in a new tab/window
            window.open(googleMapsUrl, '_blank');

            // Create a map centered on the user's location
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 15,
            };
            const map = new google.maps.Map(document.getElementById('map'), mapOptions);

            // Create markers based on the selected type
            switch (type) {
                case 'restaurants':
                    createMarker(map, latitude, longitude, 'Restaurant', 'red');
                    break;
                case 'transportation':
                    createMarker(map, latitude, longitude, 'Vehicle', 'orange');
                    break;
                case 'beautiful-areas':
                    createMarker(map, latitude, longitude, 'Beautiful Area', 'green');
                    break;
                default:
                    break;
            }

        }, (error) => {
            console.error(`Error getting location: ${error.message}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Construct Google Maps URL with the live location and search query
            const googleMapsUrl = `https://www.google.com/maps/search/${type}/@${latitude},${longitude}`;

            // Open the Google Maps URL in a new tab/window
            const newTab = window.open();
            newTab.opener = null; // Ensure the new tab has no access to the opener (your page)
            newTab.location = googleMapsUrl;

        }, (error) => {
            console.error(`Error getting location: ${error.message}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function sendFeedback() {
    const email = 'sowmyagottumukkala27@gmail.com'; // Replace with your email address
    const subject = 'Travel Explorer Feedback';

    const body = "Dear Travel Explorer team,%0D%0A%0D%0A";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}



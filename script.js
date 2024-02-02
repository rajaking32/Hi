let availableSpaces = 10; // Initial number of available parking spaces
let reservationHistory = []; // Array to store reservation history

let userProfile = {
    userName: '',
    vehicleNumber: '',
    userEmail: '',
    userPhoneNumber: '',
    vehicleType: '',
};

function updateAvailableSpaces() {
    document.getElementById('availableSpaces').innerText = availableSpaces;
}

function askVehicleType() {
    const vehicleType = prompt('Choose your vehicle type:\n1. 2-wheeler\n2. 4-wheeler');
    if (vehicleType === '1' || vehicleType.toLowerCase() === '2-wheeler') {
        return '2-wheeler';
    } else if (vehicleType === '2' || vehicleType.toLowerCase() === '4-wheeler') {
        return '4-wheeler';
    } else {
        alert('Invalid selection. Please choose either 1 or 2.');
        return askVehicleType(); // Recursive call if the selection is invalid
    }
}

function updateProfileInfo() {
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <p>Name: ${userProfile.userName}</p>
        <p>Vehicle Number: ${userProfile.vehicleNumber}</p>
        <p>Email: ${userProfile.userEmail}</p>
        <p>Phone Number: ${userProfile.userPhoneNumber}</p>
        <p>Vehicle Type: ${userProfile.vehicleType}</p>
    `;
}


function showProfile() {
    const profileSection = document.getElementById('profile');

    // Check if the user has reserved a parking space before displaying the profile
    if (userProfile.userName && userProfile.vehicleNumber && userProfile.userEmail &&
        userProfile.userPhoneNumber && userProfile.vehicleType) {
        updateProfileInfo();
        profileSection.style.display = 'block';
    } else {
        alert('No profile information available. Please reserve a parking space first.');
    }
}

function reserveSpace() {
    // Ask for user's name, vehicle number, email, phone number, and vehicle type
    userProfile.userName = prompt('Enter your name:');
    userProfile.vehicleNumber = prompt('Enter your vehicle number:');
    userProfile.userEmail = prompt('Enter your email:');
    userProfile.userPhoneNumber = prompt('Enter your phone number:');
    userProfile.vehicleType = askVehicleType();

    // Check if the user provided the required information
    if (userProfile.userName && userProfile.vehicleNumber && userProfile.userEmail &&
        userProfile.userPhoneNumber && userProfile.vehicleType) {
        availableSpaces--;
        updateAvailableSpaces();

        // Add reservation to history with user's information
        const timestamp = new Date().toLocaleString();
        const reservationInfo = `Reserved by ${userProfile.userName} (${userProfile.vehicleNumber}), Email: ${userProfile.userEmail}, Phone Number: ${userProfile.userPhoneNumber}, Vehicle Type: ${userProfile.vehicleType} on ${timestamp}`;
        reservationHistory.push(reservationInfo);

        alert('Parking space reserved! Please navigate to the reserved space.');
    } else {
        alert('Please provide all required information.');
    }
}

function showDestinationForm() {
    const destinationForm = document.getElementById('destinationForm');
    destinationForm.style.display = 'block';
}

function navigateToReservedSpace() {
    // Predefined destination coordinates (for example)
    const predefinedDestination = 'mgroad';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLocation = `${position.coords.latitude},${position.coords.longitude}`;

                // Create a Google Maps URL with both user location and predefined destination
                const mapsURL = `https://www.google.com/maps/dir/${userLocation}/${predefinedDestination}/`;

                // Open a new tab/window with the Google Maps URL
                window.open(mapsURL, '_blank');
            },
            function (error) {
                console.error('Error getting user location:', error.message);
                alert('Error getting user location. Please try again or manually enter your location.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please manually enter your location.');
    }
}

function showReservationHistory() {
    const historySection = document.getElementById('reservationHistory');
    const historyList = document.getElementById('historyList');

    // Clear previous history
    historyList.innerHTML = '';

    // Display reservation history
    if (reservationHistory.length > 0) {
        reservationHistory.forEach((entry) => {
            const listItem = document.createElement('li');
            listItem.textContent = entry;
            historyList.appendChild(listItem);
        });

        historySection.style.display = 'block';
    } else {
        alert('No reservation history available.');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Function to get user data from local storage
    function getUserData() {
        let userData = localStorage.getItem('userProfile');
        return userData ? JSON.parse(userData) : {
            name: 'John Doe', // Default name
            email: 'john.doe@example.com', // Default email
            contact: '123-456-7890', // Default contact
            activities: [],
            donations: [],
            profilePic: 'profile-placeholder.png' // Default profile picture
        };
    }

    displayProfileInfo();
    displayDonations();
    setupEditProfileForm();
    setupChangePasswordForm();
    setupAddDonationForm();
    setupProfilePicUpload();
    
    // Function to display user profile information
    function displayProfileInfo() {
        const profileInfoDiv = document.getElementById('profile-info');
        const profileImageDisplay = document.getElementById('profileImageDisplay');
        const userData = getUserData();
        profileInfoDiv.innerHTML = `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Contact:</strong> ${userData.contact}</p>
        `;
        profileImageDisplay.src = userData.profilePic;
    }

   

    // Function to display donations
    function displayDonations() {
        const donationsListDiv = document.getElementById('donations-list');
        const userData = getUserData();
        let donationsHTML = '<ul>';
        if (userData.donations.length > 0) {
            userData.donations.forEach(donation => {
                donationsHTML += `<li>Amount: ${donation.amount}, Date: ${donation.date}, Cause: ${donation.cause}</li>`;
            });
        } else {
            donationsHTML += '<li>No donations added yet.</li>';
        }
        donationsHTML += '</ul>';
        donationsListDiv.innerHTML = donationsHTML;
    }

    // Function to show Bootstrap modal alert
    function showAlert(message) {
        const modalBody = document.getElementById('alertModalBody');
        modalBody.textContent = message;
        $('#alertModal').modal('show');
    }

    // Initial display
    displayProfileInfo();
/*     displayActivities();
 */    displayDonations();
    setupEditProfileForm();
    setupChangePasswordForm();
/*     setupAddActivityForm();
 */    setupAddDonationForm();
    setupProfilePicUpload();

    // Function to handle edit profile form submission
    function setupEditProfileForm() {
        const editForm = document.getElementById('edit-form');
        editForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const contactInput = document.getElementById('contact');

            let userData = getUserData();
            userData.name = nameInput.value;
            userData.email = emailInput.value;
            userData.contact = contactInput.value;

            localStorage.setItem('userProfile', JSON.stringify(userData));
            displayProfileInfo();
            showAlert('Profile updated successfully!');
        });
    }

    // Function to handle change password form submission
    function setupChangePasswordForm() {
        const passwordForm = document.getElementById('password-form');
        passwordForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const currentPasswordInput = document.getElementById('currentPassword');
            const newPasswordInput = document.getElementById('newPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            if (newPasswordInput.value === confirmPasswordInput.value) {
                showAlert('Password changed successfully!');
                // In a real application, you would handle password change logic here
            } else {
                showAlert('New password and confirm password do not match.');
            }
        });
    }

  

    // Function to handle add donation form submission
    function setupAddDonationForm() {
        const donationForm = document.getElementById('donation-form');
        donationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const donationAmountInput = document.getElementById('donationAmount');
            const donationDateInput = document.getElementById('donationDate');
            const donationCauseInput = document.getElementById('donationCause');

            const donation = {
                amount: donationAmountInput.value,
                date: donationDateInput.value,
                cause: donationCauseInput.value
            };

            let userData = getUserData();
            userData.donations.push(donation);
            localStorage.setItem('userProfile', JSON.stringify(userData));
            displayDonations();
            donationAmountInput.value = ''; // Clear input field
            donationDateInput.value = ''; // Clear input field
            donationCauseInput.value = ''; // Clear input field
            showAlert('Donation added successfully!');
        });
    }

    // Function to handle profile picture upload
    function setupProfilePicUpload() {
        const profilePicInput = document.getElementById('profilePic');
        const uploadPicBtn = document.getElementById('uploadPicBtn');
        const profileImageDisplay = document.getElementById('profileImageDisplay');

        uploadPicBtn.addEventListener('click', function() {
            profilePicInput.click(); // Programmatically trigger file input
        });

        profilePicInput.addEventListener('change', function() {
            const file = profilePicInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImageDisplay.src = e.target.result; // Display image
                    let userData = getUserData();
                    userData.profilePic = e.target.result; // Store image data URL
                    localStorage.setItem('userProfile', JSON.stringify(userData));
                }
                reader.readAsDataURL(file); // Read file as data URL
            }
        });
    }
});

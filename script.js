let selectedPG ='';
function selectpg(pgtype){
  selectedPG = pgtype;
  document.getElementById('selectedpg').value = pgtype+ "PG"
}

function submitBooking() {
    // Reset previous validation styles
    resetValidationStyles();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const checkInDate = document.getElementById('checkInDate').value.trim();
    const condition = document.getElementById('condition').value;
    const roomType = document.getElementById('roomType').value;

    // Validate form fields
    
    if (name === '') {
        highlightField('name');
        return;
    }

    if (age === '' || isNaN(age)) {
        highlightField('age');
        return;
    }

    if (phoneNumber === '' || !/^\d{10}$/.test(phoneNumber)) {
        highlightField('phoneNumber');
        return;
    }

    if (checkInDate === '') {
        highlightField('checkInDate');
        return;
    }
    if (condition === '') {
      highlightField('condition');
      return;
  }

    // Check-out date is optional, so no need to validate it

    if (roomType === '') {
        highlightField('roomType');
        return;
    }
    if (selectedPG !== '') {
      document.getElementById('selectedPg').value = selectedPG + " PG";
  }
    // If all validations pass, display the booking confirmation
    const resultSection = document.getElementById('bookingResult');
    resultSection.innerHTML = `<p class="text-success">Booking Confirmed:</p>
                              <p>Selected PG: ${selectedPG} PG</p>
                               <p>Name: ${name}</p>
                               <p>Age: ${age}</p>
                               <p>Phone Number: ${phoneNumber}</p>
                               <p>Check-in Date: ${checkInDate}</p>
                               <p>Room Type: ${roomType}</p>`;
}

// Add your API endpoint here below (replace with your actual API URL)
var API_ENDPOINT = "https://v9m7ljam9h.execute-api.us-east-1.amazonaws.com/dev/";

// Event listener for the "saveprofile" button click
document.getElementById("saveprofile").addEventListener("click", function() {

  // Gather input data from form fields
  var inputData = {
    //"ID": $('#id').val(),
    "Name": $('#name').val(),
    "Age": $('#age').val(),
    "Phone": $('#phoneNumber').val(),
    "Condition": $('#condition').val(),
    "Checkindate": $('#checkInDate').val(),
    "RoomType": $('#roomType').val(),
    "SelectedPG":selectedPG
  };

  // Send AJAX POST request to save profile data
  fetch(API_ENDPOINT, {
    method: 'POST', // Use POST for sending data to the server
    headers: {
      'Content-Type': 'application/json; charset=utf-8' // Specify JSON content type
    },
    body: JSON.stringify(inputData) // Convert data to JSON string
  })
  .then(response => response.json()) // Parse JSON response (if applicable)
  .then(data => {
    // Handle successful response (e.g., display success message)
    document.getElementById("profileSaved").innerHTML = "Profile sent to Owner! will reach shortly...";
    setTimeout(function() {
        window.location.reload(); // Reload the current page
      }, 3000);
    
  })
  .catch(error => {
    // Handle errors (e.g., display error message)
    console.error('Error saving profile:', error);
    alert("An error occurred while saving your profile. Please try again later.");
  });
});


function highlightField(fieldId) {
    document.getElementById(fieldId).classList.add('is-invalid');
}

function resetValidationStyles() {
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => field.classList.remove('is-invalid'));
}

// main working one
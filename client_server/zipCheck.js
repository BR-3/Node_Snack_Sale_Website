$(document).ready(function() {
  $('#zipForm').submit(function(event) {
      event.preventDefault();
      let zipCode = $('#zipEntry').val();

      // Validate the zip code format (for simplicity, assuming a valid zip code format)

      // Call the API to get the state based on the zip code
      $.getJSON(`http://api.zippopotam.us/us/${zipCode}`, function(data) {
          let state = data.places[0].state;
          let responseMsg = (state === 'NJ' || state === 'NY') ? "We can ship to you!" : "We are unable to ship to your location.";
          $('#response').text(responseMsg);
      }).fail(function() {
          $('#response').text("Error: Unable to check eligibility. Please try again later.");
      });
  });
});

// const shipMessage = "We can ship to you!";
// const noShipMessage = "We are unable to ship to your location.";

// $(document).ready(function() {
//     $("#searchButton").click(function () {
//       const enteredLocation = $("#zipEntry").val();
//       if(enteredLocation) {
//         $.ajax({
//           url: `http://api.zippopotam.us/us/{enteredLocation}`,
//           method: 'GET',
//           dataType: 'json',

//           success: function(data) {
//             var responseMessage;
//             if (!data.results) {
//               responseMessage = 'City not found';
//               alert('city not found');
//             } else {
//               const userState = data.places.state;
//               alert(userState);
//               responseMessage = (userState === 'New York' || userState === 'New Jersey') ? shipMessage : noShipMessage;
//             }
//             $('#response').text(responseMessage);
//           },
          
//           error: function(error) {
//             console.error('Error fetching location data:', error);
//             alert('An error occurred. Please try again later.');
//           }
//         });
        
//       } else {
//         alert("Please enter your zip code.");
//       }
//     });

// });

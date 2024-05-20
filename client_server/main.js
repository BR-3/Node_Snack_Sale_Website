
// A $( document ).ready() block.
$(document).ready(function() {
    // slick carousel of text
    $(".js-slick-carousel").slick({
        accessibility:true,
        dots:true,
        arrows:false,
        autoplay:true,
        autoplaySpeed: 4000,
        cssEase:'ease',
        draggable:true,
        edgeFriction: 0.35,
        pauseOnHover: true,
        touchMove:true,
        adaptiveHeight: true
    });

    // modify text
    $("#userName").blur(function() {
        const enteredText = $(this).val();
        if(enteredText) {
            $("#welcomeMessage").text('Hello, ' + enteredText);
        } else {
            $("welcomeMessage").text('');
        }
    });    
// use onclick to validate user input
    $("#loginSubmit").click(function() {
        $("#validation").validate({
            rules: {
              mail: {
                required: true,
                email: true 
              },
              confCode: "required"
            },
          });
      });

    // modify css
    $('#loginSubmit, #contactSubmit, #reset, #updateSubmit, #chooseUpdate, #searchButton, #logoutSubmit').mouseenter(function() {
        $(this).css("color", "rgb(224, 190, 255)");
    });

    $('#loginSubmit, #contactSubmit, #reset, #updateSubmit, #chooseUpdate, #searchButton, #logoutSubmit').mouseleave(function() {
        $(this).css("color", "white");
    });
    
  });

  
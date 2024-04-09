
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
              userName: "required",
              streetNumber: "required",
              streetName: "required",
              city: "required",
              state: "required",
              zip: "required",
              phone: {
                required: true,
                phoneUS: true
              },
              mail: {
                required: true,
                email: true 
              },
              chinuch: "required",
              confCode: "required"
            },
          });
      });

    // modify css
    $('#loginSubmit, #contactSubmit, #reset').mouseenter(function() {
        $(this).css("color", "rgb(224, 190, 255)");
    });

    $('#loginSubmit, #contactSubmit, #reset').mouseleave(function() {
        $(this).css("color", "white");
    });
    
  });

  
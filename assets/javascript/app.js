var topics = ["Ash Williams", "Office Space", "Spider-Man", "Pizza", "Gorillaz", "Ripley", "Overwatch", "GMM", "Lando Calrissian", "Parks and Recreation",];

      // display gifs on page
      function displayGifs() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=F3gHI0icvoKE31THDhy3QynIGjV7PUiz&limit=10";

        // ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          console.log(response);
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var Image = $("<img>");
            Image.attr("src", results[i].images.original_still.url);
            Image.attr("data-still", results[i].images.original_still.url);
            Image.attr("data-animate", results[i].images.original.url);
            Image.addClass("gifclass");

            gifDiv.append(Image);
            gifDiv.append(p);
            
            $("#gifs-appear-here").prepend(gifDiv);
          }
        })

      }

      //make buttons function
      function renderButtons() {

        // Deleting the topics prior to adding new topics
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Generating buttons for each topic in the array
          
          var button = $("<button>");
          // Adding a class of gif-btn to our button
          button.addClass("gif-btn");
          button.addClass("btn btn-danger mr-1 mt-1 mb-2");
          
          // Adding a data-attribute
          button.attr("data-name", topics[i]);
          // Providing the initial button text
          button.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(button);
        }
      }

      // Topic clicked event
      $("#submit-button").on("click", function(event) {
        event.preventDefault();
        // Textbox input
        var gif = $("#gif-input").val().trim();

        // Input to array
        topics.push(gif);

        // Updates buttons
        renderButtons();
      });

      // gif-btn on click event listen
      $(document).on("click", ".gif-btn", displayGifs);

      // render buttons on load
      renderButtons();

      // pausing function
      $(document).on("click", ".gifclass", gifPause);
      function gifPause() {
        
        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      };

    
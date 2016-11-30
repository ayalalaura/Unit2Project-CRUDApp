$(document).ready(function() {
  console.log("script loaded");

var getCharacter = function(characterSearch){
  console.log('characterSearch');

  $.ajax({
    url: '/api', // created this route in app.js with specific ajax call using request module (thx Heidi & Krist!)
    method: 'GET',
    data: {
      value: characterSearch,
      characterData,
      comicData
    },
    dataType: 'json'
  }).done(function(data){
    console.log(data);
    for (var i = 0; i < comicData.length; i++) {
        searchResults(characterData, comicData[i]);
    } //end for
// access both items
  searchResults(data);
  }) // end .done
} // end ajax call


// THIS IS FINE
   var searchMarvel = function() {
       $("#search-button").click(function() { // event listener on search button
           var searchTerm = $("#search-input").val(); // declaring var with value entered into input
           getCharacter(searchTerm); // call the internal api (with data) using term entered into input
       });
   };

   searchMarvel(); // calling event listener (button click), which triggers subsequent functions


// combine these two functions into one
   var searchResults = function(data) {
       // var id = data.id;
       var characterName = characterData.name;
       var characterDescription = characterData.description;
       var characterImage = characterData.thumbnail.path; // Console ERROR: cannot read path of undefined
       marvelCharacter(characterName, characterDescription, characterImage); // calling marvelCharacter and passing through this data
   }

   var marvelCharacter = function(characterName, characterDescription, characterImage) {
       var $body = $('body');
       // $body.append('<p>' + id + '</p>');
       $body.append('<p>' + characterName + '</p>');
       $body.append('<p>' + characterDescription + '</p>');
       $body.append("<img src=" + characterImage + '/standard_medium.jpg' + ">"); // completing path, as per Marvel API docs
   }


}); // end document ready


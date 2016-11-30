$(document).ready(function() {
  console.log("script loaded");

var getCharacter = function(searchCharacter){
  console.log('searchCharacter');

  // thanks Heidi & Kristi for helping me use request to connect server with client side API calls
  $.ajax({
    url: '/api', // created this route/url in app.js with specific ajax call (character data) using request module
    method: 'GET',
    data: { value: searchCharacter},
    dataType: 'json'
  }).done(function(data){
    console.log(data);
//  for (var i = 0; i < data.length; i++) {
//     searchResults(data[i]);
//   } //end for
  searchResults(data);
  }) // end .done
} // end ajax call


   var searchMarvel = function() {
       $("#search-button").click(function() {
           var searchTerm = $("#search-input").val();
           getCharacter(searchTerm);
       });
   };

   searchMarvel();


   var searchResults = function(data) {
       var id = data.id;
       var name = data.name;
       var description = data.description;
       var image = data.thumbnail.path; // Console ERROR: cannot read path of undefined
       marvelCharacter(id, name, description, image);
   }

   var marvelCharacter = function(id, name, description, image) {
       var $body = $('body');
       $body.append('<p>' + id + '</p>');
       $body.append('<p>' + name + '</p>');
       $body.append('<p>' + description + '</p>');
       $body.append("<img src='" + image + "'>");
   }


}); // end document ready


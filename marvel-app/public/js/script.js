$(document).ready(function() {
  console.log("script loaded");



// click function - triggers ajax function
   var searchMarvel = function() {
       $("#search-button").click(function() { // event listener on search button
           var searchTerm = $("#search-input").val(); // declaring var with value entered into input
           getCharacter(searchTerm); // call the internal api (with data) using term entered into input
       });
   };
   searchMarvel(); // calling event listener (button click), which triggers subsequent functions



// ajax function - call the append functions
var getCharacter = function(characterSearch){
  // console.log('characterSearch');
  $.ajax({
    url: '/api', // created this route/url in app.js with specific ajax call using request module (thnx Heidi & Kristi!)
    method: 'GET',
    data: { value: characterSearch},
    dataType: 'json'
  }).done(function(data){
    console.log(data); // entire data object (characterData AND comicData)
    searchResults(data);
    // marvelCharacter();
    // marvelComics();
  }) // end .done
} // end ajax call



// // append character data
// var marvelCharacter = function(data){
//   var $body = $('body');
//   // var characterName = data.characterData.name;
//   // var characterDescription = data.characterData.description;
//   // var characterImage = data.characterData.thumbnail.path;
//   var characterName = characterData.name;
//   var characterDescription = characterData.description;
//   var characterImage = characterData.thumbnail.path;

//   $body.append('<p>' + characterName + '</p>');
//   $body.append('<p>' + characterDescription + '</p>');
//   $body.append("<img src=" + characterImage + '/standard_medium.jpg' + ">");
// }



// // append comic data
// var marvelComics = function(data){
//   var $body = $('body');
//   var comicTitle = data.comicData[i].title;
//   var comicImage = data.comicData[i].thumbnail.path;

//   for (var i = 0; i < comicData.length; i++){
//     $body.append('<p>' + comicTitle + '</p>');
//     $body.append("<img src=" + comicImage + '/standard_medium.jpg' + ">");
//   }
// }



// combine these two functions into one
   var searchResults = function(data) {
       var $body = $('body');
       var characterName = data.characterData.name;
       var characterDescription = data.characterData.description;
       var characterImage = data.characterData.thumbnail.path;
       // add comicData here and below
       // should comic data be in a for loop? I need to access items from the comicData array and then parse through it
       // var comicTitle = data.comicData[i].title;
       // var comicImage = data.comicData[i].thumbnail.path;

       addCharacter(characterName, characterDescription, characterImage); // calling addCharacter
       addComics(data);

   }

   var addCharacter = function(characterName, characterDescription, characterImage) {
       var $body = $('body');
       $body.append('<p>' + characterName + '</p>');
       $body.append('<p>' + characterDescription + '</p>');
       $body.append("<img src=" + characterImage + '/standard_medium.jpg' + ">");

       // $body.append('<p>' + comicTitle + '</p>');
       // $body.append("<img src=" + comicImage + '/standard_medium.jpg' + ">");

       // for loop to append each item from comicData array
        // for (var i = 0; i < comicData.length; i++){
        //   $body.append('<p>' + comicTitle + '</p>');
        //   $body.append("<img src=" + comicImage + '/standard_medium.jpg' + ">");
        // }
   }


   var addComics = function(data){
    var $body = $('body');

     // for loop to append each item from comicData array
        for (var i = 0; i < data.comicData.length; i++){
          var comicTitle = data.comicData[i].title;
          var comicImage = data.comicData[i].thumbnail.path;
          $body.append('<p>' + comicTitle + '</p>');
          $body.append("<img src=" + comicImage + '/standard_medium.jpg' + ">");
          $body.append('<button id="save-button"> Save </button>');
        }
   }



}); // end document ready


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
  // clearing DOM of previous results
    var $hero = $('.character-result');
    $hero.remove();
    var $issues = $('.comic-result');
    $issues.remove();

  // console.log('characterSearch');
  $.ajax({
    url: '/api', // created this route/url in app.js with specific ajax call using request module (thnx Heidi & Kristi!)
    method: 'GET',
    data: { value: characterSearch},
    dataType: 'json'
  }).done(function(data){
    console.log(data); // entire data object (characterData AND comicData)
    searchResults(data);
  }) // end .done
} // end ajax call


   var searchResults = function(data) {

       var characterName = data.characterData.name;
       var characterDescription = data.characterData.description;
       var characterImage = data.characterData.thumbnail.path;

       // console.log('Entering search results function');

       addCharacter(characterName, characterDescription, characterImage); // calling addCharacter
       addComics(data); // calling addComics
   }



  // append character info; this does not need to be saved to db
   var addCharacter = function(characterName, characterDescription, characterImage) {

       var $body = $('body');
       var $characterResult = $('<div class="character-result"></div>');
       var $break = $('</br>'); // adding breaks in lieu of styling :[

       $body.append($characterResult);

       $characterResult.append('<img class="character-image" src=' + characterImage + "/standard_xlarge.jpg" + '>');
       $characterResult.append('<h3 class="character-name">' + characterName + '</h3>');
       $characterResult.append('<h4 class="character-description">' + characterDescription + '</h4>');
       $characterResult.append($break);
   }


   // append comics to body and add a hidden save form to grab data for db (thanks Marcos & Hillary!)
   var addComics = function(data){

     // for loop to append each item from comicData array
        for (var i = 0; i < data.comicData.length; i++){
          // var container = $('<div class="grid"></div>'); // save to a container and append that way?

          var $body = $('body');
          var $comicResult = $('<div class="comic-result"></div>');
          var $form = $('<form class="hidden-form" action="/save" method="POST"></form>');
          var $button = $("<button class='save-button' type='submit'>Save</button>");
          var $break = $('</br>');

          var comicTitle = data.comicData[i].title;
          var comicImage = data.comicData[i].thumbnail.path;
          var comicId = data.comicData[i].id;

          $body.append($comicResult);

          $comicResult.append($form); // appending hidden form to the div

          $comicResult.append("<img src=" + comicImage + '/portrait_incredible.jpg' + ">"); // comic image
          $form.append('<input name="thumbnail" type="hidden" value=" ' + comicImage + ' ">') // comic image info

          $comicResult.append('<h3 class="comic-title">' + comicTitle + '</h3>');
          $form.append('<input name="title" type="hidden" value =" '  + comicTitle + ' ">');

          $comicResult.append($break);

          $form.append('<input name="comicID" type="hidden" value =" ' + comicId + ' ">')

          $form.append($button);

        } // end of for loop
   }



}); // end document ready


$(document).ready(function() {
  console.log("script loaded");

var getCharacter = function(searchTerm){
  console.log('searchTerm');

  $.ajax({
    url: '/api',
    method: 'GET',
    data: { value: searchTerm},
    dataType: 'json'
  }).done(function(data){
    console.log(data);

  }) // end .done
} // end ajax call



// // $('button').on('click', getResults); // click listener

// var eventListener = function(data){
//     var $input = $('#search-input'); // input field
//     $('button').click(function(event){
//         event.preventDefault();
//         getResults($input.val());
//         console.log("I made it!");
//     })
//     }
//     eventListener();

}); // end document ready


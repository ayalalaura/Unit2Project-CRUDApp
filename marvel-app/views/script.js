// $(document).ready(function(){
//   console.log("loaded");
//   var $body = $('body');

//   // getResults function goes here
// var getResults = function(character){
//   // First, clears the DOM of any elements of the class item
//   // $body.remove('.item');
//   // Take the text value of the input box and store it in a variable called query
//   var $query = $('#search-input').val(); // input field value
//   var apikey = '038b66489f7de8cde751cde5daa8741f';
//   var hash = 'd59c2e300b444d5f0535d48518397e68';

//  $.ajax({
//       type: 'GET',
//       // url: 'http://gateway.marvel.com/v1/public/comics?apikey=yourAPIKEY',
//       url: 'https://gateway.marvel.com:443/v1/public/characters?name=' + character +'&apikey=' + apikey + '&hash=' + hash,
//       dataType: 'jsonp',
//       // data : { term: $query, media: "music", entity: "album", limit: 25}
//     }).done(function(data) {
//         // results = data.results;
//         // $results = $('<ul>');
//         // // var $item, $thumbnail, $description, $artist, $album, $price;
//         // // console.log(data);
//         // // Use a forEach method to iterate over all of the result items and then do the following in the for loop:
//         // results.forEach(function(results){
//         //   //   - USING JQUERY, create a 'li' element and store it in '$item',
//         //   //   - Add a class of 'item' to '$item'
//         //   var $item = $('<li>').addClass('item');
//         //   //   create a '<img>' element and store it in '$thumbnail',
//         //   //   - Add a class of 'albumCover' to '$thumbnail'
//         //   //   - Find where the thumbnail image is being stored in the result object and then set the '$thumbnail's src attribute to it
//         //   var $thumbnail = $('<img>').addClass('albumCover').attr('src', results.artworkUrl100);
//         //   // create a '<div>' element and store it in $decription,
//         //    var $description = $('<div>');
//         //   // and create '<p>' elements and store them in $artist, $album, $price
//         //    //   - Find where the artist's name is being stored in the object and set artist text to that, do the same for the album and price
//         //   //   - Add a class of 'artist' to '$artist'
//         //   var $artist = $('<p>').addClass('artist').text(results.artistName);
//         //   //   - Add a class of 'album' to '$album'
//         //   var $album = $('<p>').addClass('album').text(results.collectionName);
//         //   //   - Add a class of 'price' to '$price'
//         //   var $price = $('<p>').addClass('price').text('$' + results.collectionPrice);
//         //   //   - Append $artist, $album, $price to $description
//         //   $description.append($artist, $album, $price);
//         //   //   - Append $thumbnail and $description to $item
//         //   $item.append($thumbnail, $description);
//         //   //   - Append $item to $results
//         //   $results.append($item);
//         // //  - End forEach method
//         // });
//         // //  - Append $results to $body
//         // $body.append($results);
//       })

// } // end getResults

//   // Event Handlers go here
//   $('button').on('click', getResults) // write event listeners this way!!! so much neater

//    // var eventListener = function(data){
//    //    $('#click-me').click(function(event){
//    //      event.preventDefault();
//    //      getResults();
//    //      // console.log(data);
//    //    })
//    //  }
//    //  eventListener();

// });


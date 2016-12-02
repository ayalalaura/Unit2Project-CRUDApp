# Unit 2 Project - Marvel Revisited App

https://marvelcrudapp.herokuapp.com/

The Marvel Revisited App invites Marvel Comics fans both old and new to search for their favorite characters, learn a bit about their backstories, and save recent issues featuring that character to their Stash. The app is easy to navigate, though users who sign up will not only be able to conduct searches, they will also be able to save and delete items to their customized Reading Stash.

![alt tag](https://media.tenor.co/images/166879c7b7a55ecb2e5c1ad5f3b9f182/raw)

### Technologies Used
- node.js
- npm packages including: express, mustache-express, pg-promise, body-parser, and request
- PostgreSQL
- jQuery for client-side functionality like triggering appends
- Bootstrap for the basic HTML & CSS (forms, nav bar, and footer for all my views)
- Postman for troubleshooting how to make the right API call and parse through JSON data
- Marvel Comics API (https://developer.marvel.com/)

### Approach
- In order to avoid being a feature creep, I continuously pared down my MVP to meet all the functionality requirements. 
- I tackled the hardest part of my app first and worked from there. Once I was able to successfully connect to the Marvel API, I was then able to append it to my views, save it in my database, and then render the saved data.
- Any extra time I had was spent fixing little errors and trying to enhance user flow. Bootstrap helped me save time and create a framework to test my functionality.

![Imgur](http://i.imgur.com/fhmql4s.jpg?1)

![Imgur](http://i.imgur.com/Egy3xRFl.jpg?2)

![Imgur](http://i.imgur.com/ArJ2ola.jpg?1)

### Challenges
- Staying on task, at times. This was especially true when it came to styling. Though this is something I could easily fix later on, the lack of styling (such as adding padding, grids, etc.) still irks me.
- Asking for help! I lost a lot of time the first couple days just staring at my screen waiting for inspiration to strike. Sometimes it did, but when I asked for help not only did I clarify errors in my code, I also saved precious time and was able to help other classmates with similar issues.
- Figuring out all the places where I need to/should add error messages. For next time, I would spent an extra hour or so on user flow.
-Heroku gives me some issues when a user attempts to search for a character that does not exist in the Marvel API. I plan to create a pop up error message to prevent the app from crashing.

### Installation Instructions
- With my server, database, and required keys connected to Heroku, the app is ready to use from the link above.

### Reach
- Create a bilingual app - I still hope to achieve this by the final project.
- CSS! I regret not being able to do more CSS or dig deeper into Bootstrap, especially considering this is an app meant to highlight visual media (comics and their awesome illustrated covers).
- Refining search with filters, allow partial searches, etc. 
- An app that followed a seamless user flow.

### THANKS!
Much thanks to all our fabulous WDI instructors (John, Heidi, Jared, Tims), Nick, and my fellow classmates for helping me make this work! 

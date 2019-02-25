# LIRI NODE APP
![](https://media.giphy.com/media/uZvpSc5LVa3hS/giphy.gif)

[Click here to watch the demo video.](https://vimeo.com/319516549)

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line Node app that takes in parameters and gives you back data from Bandsintown, Spotify and OMDb APIs.

# How the app works:
Open the terminal and type in the following commands
  * `node liri.js concert-this <artist/band name here>`
    
    This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
    * Name of the venue 
    * Venue location 
    * Date of the Event
  
  * `node liri.js spotify-this-song '<song name here>'`
  
    This will show the following information about the song in your terminal/bash window

    * Artist(s)
    * The song's name.
    * A preview link of the song from Spotify.
    * The album that the song is from.
    
  *  `node liri.js movie-this '<movie name here>'`
  
      This will output the following information to your terminal/bash window:
   
       * Title of the movie.
       * Year the movie came out
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

  * `node liri.js do-what-it-says'`
  
      LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
      

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var request = require('request');
var figlet = require('figlet');
var chalk = require('chalk');

var command = process.argv[2];
var parameter = process.argv[3];


function switchCase() {

  switch (command) {

    case 'concert-this':
      bandsInTown(parameter);                   
      break;                          

    case 'spotify-this-song':
      spotifySong(parameter);
      break;

    case 'movie-this':
      omdbInfo(parameter);
      break;

    case 'do-what-it-says':
      getRandom();
      break;

      default:                            
      display("Not a valid command. Try again.");
      break;

  }
};



//BANDS IN TOWN

function bandsInTown(parameter){

if ('concert-this')
{
	var artist="";
	for (var i = 3; i < process.argv.length; i++)
	{
		artist+=process.argv[i];
    }
var bandsFig = "BandsInTown"
    figlet(bandsFig, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.green(data));
    });
	// console.log(artist);
}
else
{
	artist = parameter;
}


var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp";


request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    var JS = JSON.parse(body);
    for (i = 0; i < JS.length; i++)
    {
      var dateTime = JS[i].datetime;
        var month = dateTime.substring(5,7);
        var year = dateTime.substring(0,4);
        var day = dateTime.substring(8,10);
        var dateForm = month + "/" + day + "/" + year
  
      display(chalk.yellow("\n---------------------------------------------------\n"));
      display(chalk.bgCyan("Name: " + JS[i].venue.name));
      display(chalk.bgCyan("City: " + JS[i].venue.city));
      if (JS[i].venue.region !== "")
      {
        display(chalk.bgCyan("Country: " + JS[i].venue.region));
      }
      display(chalk.bgCyan("Country: " + JS[i].venue.country));
      display(chalk.bgCyan("Date: " + dateForm));
    }
  }
});
}



//SPOTIFY
var spotifyFig = "Spotify"

function spotifySong(parameter) {


  var searchTrack;
  if (parameter === undefined) {
    searchTrack = "Ace of Base The Sign";
  } else {
    searchTrack = parameter;
  }

  figlet(spotifyFig, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.green(data));
});

  spotify.search({
    type: 'track',
    query: searchTrack
  }, function(error, data) {
    if (error) {
      display('Error recorded: ' + error);
      return;
    } else {
      display(chalk.yellow("\n---------------------------------------------------\n"));
      display(chalk.bgGreen("Artist: " + data.tracks.items[0].artists[0].name));
      display(chalk.bgGreen("Song: " + data.tracks.items[0].name));
      display(chalk.bgGreen("Preview: " + data.tracks.items[3].preview_url));
      display(chalk.bgGreen("Album: " + data.tracks.items[0].album.name));
    }
  
  });
};



//OMDB

function omdbInfo(parameter) {


  var findMovie;
  if (parameter === undefined) {
    findMovie = "Mr. Nobody";
  } else {
    findMovie = parameter;
  };

  var omdbFig = "OMDB"
    figlet(omdbFig, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.green(data));
    });

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(err, res, body) {
  	var bodyOf = JSON.parse(body);
    if (!err && res.statusCode === 200) {
      display(chalk.yellow("\n---------------------------------------------------\n"));
      display(chalk.bgRed("Title: " + bodyOf.Title));
      display(chalk.bgRed("Release Year: " + bodyOf.Year));
      display(chalk.bgRed("IMDB Rating: " + bodyOf.imdbRating));
      display(chalk.bgRed("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value)); 
      display(chalk.bgRed("Country: " + bodyOf.Country));
      display(chalk.bgRed("Language: " + bodyOf.Language));
      display(chalk.bgRed("Plot: " + bodyOf.Plot));
      display(chalk.bgRed("Actors: " + bodyOf.Actors));
    }
  });
};



//DO WHAT RANDOM.TXT SAYS

function getRandom() {

   
 fs.readFile('random.txt', "utf8", function(error, data){

    if (error) {
        return display(error);
      }

  
    var dataArr = data.split(",");
    
    if (dataArr[0] === "spotify-this-song") {
        
      var songCheck = dataArr[1].trim().slice(1, -1);
      spotifySong(songCheck);
    } 
   
    });

};



//SEND TO LOG.TXT

function display(dataToLog) {

	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		
		if (err) return display('Error logging data to file: ' + err);	
	});
}


switchCase();
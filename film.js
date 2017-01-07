var omdb = require('omdb');
var filmMotoru = {};
filmMotoru.generateRandomID = function(){
    return "tt" + String('0000000'+Math.floor(Math.random()*5000000)).slice(-7);
}
filmMotoru.findAMovie = function(callback){
    var movieID = filmMotoru.generateRandomID();
    omdb.get({ imdb: movieID }, true, function(err, movie) {
        if(err){
            return callback(err);
        }
        else if(!movie){//sayfa bulunamadı
            console.log(movieID + " 404");
            return filmMotoru.findAMovie(callback);
        }
        else {
            if(movie.type === 'movie'){
               if(movie.runtime < 45){
                    console.log(movieID + " NOT A MOVIE");
                    return filmMotoru.findAMovie(callback);
                }
                else if(movie.imdb.rating === null){
                    console.log(movieID + " NO IMDB POINT");
                    return filmMotoru.findAMovie(callback);
                }
                else {
                    return callback(null,movie);
                } 
            }
            else{
                return filmMotoru.findAMovie(callback);
            }
            
        }
    });
}

module.exports = filmMotoru;

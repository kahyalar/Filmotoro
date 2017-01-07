var omdb = require('omdb');
var diziMotoru = {};
diziMotoru.generateRandomID = function(){
    return "tt" + String('0000000'+Math.floor(Math.random()*5000000)).slice(-7);
}
diziMotoru.findAMovie = function(callback){
    var movieID = diziMotoru.generateRandomID();
    omdb.get({ imdb: movieID }, true, function(err, movie) {
        if(err){
            return callback(err);
        }
        else if(!movie){//sayfa bulunamadı
            console.log(movieID + " 404");
            return diziMotoru.findAMovie(callback);
        }
        else {
            if(movie.type === 'series'){
              if(movie.imdb.rating === null){
                    console.log(movieID + " NO IMDB POINT");
                    return diziMotoru.findAMovie(callback);
                }
                else {
                    return callback(null,movie);
                } 
            }
            else{
                return diziMotoru.findAMovie(callback);
            }
            
        }
    });
}

module.exports = diziMotoru;

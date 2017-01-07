var Twit = require('twit');
var S = require('string');
var omdb = require('omdb');
var filmMotoru = require('./film.js');
var diziMotoru = require('./dizi.js');

var T = new Twit({
    consumer_key:         'YOUR_CONSUMER_KEY'
  , consumer_secret:      'YOUR_CONSUMER_SECRET'
  , access_token:         'YOUR_ACCESS_TOKEN'
  , access_token_secret:  'YOUR_ACCESS_SECRET'
});

var stream = T.stream('statuses/filter', { track: '@filmotoro' });

stream.on('tweet', function (tweet) {
  console.log("@"+tweet.user.screen_name+": "+tweet.text+"\n");
    if(S(tweet.text).contains('@filmotoro' && '#film')){
      filmMotoru.findAMovie(function(err,movie){
      if(err){
      console.log(err);
      } else {
          var sender = tweet.user.screen_name;
          var tweet_id=tweet.id_str;
          var reply_tweet = "Film dostu @"+sender+", Filmin: "+movie.title+" ("+ movie.year+") Puanı: "+movie.imdb.rating+"/10, Türü: "+movie.genres+". İyi seyirler!";
       
          T.post('statuses/update', {in_reply_to_status_id: tweet_id, status: reply_tweet}, function (err, data, response) {
            console.log(movie.title+' <- Film Gönderildi!\n');
          });
        }
      });
    }
    else if(S(tweet.text).contains('@filmotoro' && '#dizi')){
      diziMotoru.findAMovie(function(err,movie){
      if(err){
      console.log(err);
      } else {
          var sender = tweet.user.screen_name;
          var tweet_id=tweet.id_str;
          var reply_tweet = "Film dostu @"+sender+", Dizin: "+movie.title+" Puanı: "+movie.imdb.rating+"/10, Türü: "+movie.genres+". İyi seyirler!";
       
          T.post('statuses/update', {in_reply_to_status_id: tweet_id, status: reply_tweet}, function (err, data, response) {
            console.log(movie.title+' <- Dizi Gönderildi!\n');
          });
        }
      });
    }
    else {
          var sender = tweet.user.screen_name;
          var tweet_id=tweet.id_str;
          var reply_tweet = "Film dostu @"+sender+", geçersiz parametre girdiniz: Seçenekler: #film";
       
          T.post('statuses/update', {in_reply_to_status_id: tweet_id, status: reply_tweet}, function (err, data, response) {
            console.log('Hata gönderildi!\n');
          });
        }
      
});

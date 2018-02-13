const Twit = require('twit');
const randomItem = require('random-item');
 
var T = new Twit({
  consumer_key: 'ZJXSG4rBMT6htzIZH6MFLv1zj',
  consumer_secret: 'knxtubx6AOPsAETyQeIdZjBcWvkl3YxItcZJLoVxgjbwM8oYgY',
  access_token: '962109964973088768-OmZhsyWtGXpIrCDMVOC8BPejPv9Se0O',
  access_token_secret: 'JVqteZolbh9ZedPzx7hh4N826yqX3Nc5Xb7jh8Kr2nfbA',
  timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests. 
});

//  tweet some text
var postTweet = (text)=>{
    T.post('statuses/update',{status:text},function(err,data,response){
    console.log(data);
});
};

//  retweet a tweet with a specific id  
var reTweetID = (id)=>{
    T.post('statuses/retweet/:id',{id:id},function(err,data,response){
    console.log(data);
});
};

//  destroy a tweet with a specific id 
var eraseTweet = (id)=>{
    T.post('statuses/destroy/:id',{id:id},function(err,data,response){
    console.log(data);
});
};

//twit some random text from a list
var twiteoLoco = ()=>{
    var text = randomItem(['Suck me, beautiful!','Never surrender','Welcome to the...']);
    var post = postTweet(text);
};

var retweet = ()=>{
    var word = randomItem(['virgin','food','tomato','cartridge','soup','tits','boobs','butt','juice']);
    var params = {
      q: '#'+word,
      result_type: 'recent',
      lang: 'en'    
};

    T.get('search/tweets',params,(err,data)=>{
    // if there no errors
      if (!err) {
        // grab ID of tweet to retweet
          var retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          T.post('statuses/retweet/:id', {
              id: retweetId
          },(err, response)=>{
              if (response) {
                  console.log('Retweeted!!!');
              }
              // if there was an error while tweeting
              if (err) {
                  console.log('Something went wrong while RETWEETING... Duplication maybe...');
              }
          });
      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...');
      }
    });
};



module.exports = {
    postTweet,
    reTweetID,
    eraseTweet,
    twiteoLoco,
    retweet
};
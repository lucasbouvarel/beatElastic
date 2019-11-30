var request = require('./node_modules/request-promise');
var fs = require("fs")
var authenticate = () => {
  var options = {
    method : "POST",
    uri : 'https://api.twitter.com/oauth2/token',
    headers : {
      "Authorization" : "Basic <Y0xsRGVsOXlMWmRXS08xQlhYaklEb1FQbTpHTWJOVzBPNGJ2Wm9RaTR6bk1nTnQ1VFYzVzNCbm9QZzl2Wm1lZ2FrSFM4UmtqNTJHVA==>",
      "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
    },
    json : true,
    form : {
      grant_type:"client_credentials"
    }
  }
  var token
  return new Promise(function(resolve, reject){
    request(options)
    .then(body => {
      token=body.access_token
      resolve(token)
    })
    .catch(err => {
      reject(err.message)
    })
  })
}


var makeRequest = (url, bearer, parameters) => {
  var options = {
    uri : url,
    headers : {
      "Authorization" : "Bearer "+ bearer,
      "Accept-Encoding" : "json",
      "User-Agent" : "BeatElastic",
    }
  }
  return new Promise((resolve,reject) => {
    request(options)
    .then(body => {
      resolve(body)
    })
    .catch(err => {
      reject(err.message)
    })
  })
}
var writeResponse = (text, name_file) => {
  fs.writeFile(name_file, text, (err) =>{
    if(err){
      console.log("Something occured : ",err)
    }
    console.log("The file was saved")
  })
}


authenticate()
.then(token => {
  console.log("I am authenticated : ", token)
  //url='https://api.twitter.com/1.1/search/tweets.json?q=from%3Abouvbigo&result_type=popular&count=100'
  //url='https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump'
  //url='https://api.twitter.com/1.1/search/tweets.json?q=geocode=45.75,4.85,10km' // celle ci marche pas je sais pas pq
  //url='https://api.twitter.com/1.1/search/tweets.json?q=screen_name=bouvbigo'
//  url='https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=bouvbigo&count=200' // celle ci marche
  //url='https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=200' //celle ci retourne qu'un seul tweet ????
//url="https://api.twitter.com/1.1/search/tweets.json?q=#starwars"
  makeRequest(url, token)
  .then(body => {
    var texts = JSON.parse(body)//.statuses.map(stat => stat.text)
    console.log("Here is the response : \n", texts)
    writeResponse(JSON.stringify(texts), "response.json")
    console.log("")
  })
  .catch(err => {
    console.log("Bad response : ", err)
  })
})
.catch(err => {
  console.log("I am not connected... ", err)
})


function streamConnect(token) {
  // Listen to the stream
  const config = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/sample?format=compact',
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
    timeout: 20000,
  };

  const stream = request.get(config);

  stream.on('data', data => {
    try {
      const json = JSON.parse(data);
      console.log(json);
    } catch (e) {
      // Keep alive signal received. Do nothing.
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  });

  return stream;
}

/*
var fs = require("fs")
var writeResponse = (text, name_file) => {
  fs.writeFile(name_file, text, (err) =>{
    if(err){
      console.log("Something occured : ",err)
    }
    console.log("The file was saved")
  })
}
const googleTrends = require('google-trends-api');
googleTrends.realTimeTrends({
    geo: 'FR',
    category: 'all',
}, function(err, results) {
    if (err) {
       console.log(err);
    } else {
      console.log(results.length);
      writeResponse(results, "response.json")
    }
});*/
/*googleTrends.interestByRegion({keyword: 'Donald Trump', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), resolution: 'CITY'})
.then((res) => {
  console.log(res);
  writeResponse(res, "response.json")
})
.catch((err) => {
  console.log(err);
})
*/
var unirest = require("unirest");

var req = unirest("GET", "https://jgentes-crime-data-v1.p.rapidapi.com/crime");

req.query({
	"startdate": "9%2F19%2F2015",
	"enddate": "9%2F25%2F2015",
	"lat": "37.757815",
	"long": "-122.5076392"
});

req.headers({
	"x-rapidapi-host": "jgentes-Crime-Data-v1.p.rapidapi.com",
	"x-rapidapi-key": "b9be0efa47mshcc45fb6939251dbp19e0bbjsnf08f092073b6"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

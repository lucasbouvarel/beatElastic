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
  //url='https://api.twitter.com/1.1/search/tweets.json?q=geocode=38,8976,-77,0365,10km' // celle ci marche pas je sais pas pq
  //url='https://api.twitter.com/1.1/search/tweets.json?q=screen_name=bouvbigo'
  url='https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=bouvbigo&count=200' // celle ci marche
  //url='https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=200' celle ci retourne qu'un seul tweet ????
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

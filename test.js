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
  fs.writeFile("/tmp/"+name_file, text, (err) =>{
    if(err){
      console.log("Something occured : ",err)
    }
    console.log("The file was saved")
  })
}


authenticate()
.then(token => {
  console.log("I am authenticated : ", token)
  url='https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2'
  makeRequest(url, token)
  .then(body => {
    var texts = JSON.parse(body).statuses.map(stat => stat.text)
    console.log("Here is the response : \n", texts)
    writeResponse(JSON.stringify(texts), "response.json")
  })
  .catch(err => {
    console.log("Bad response : ", err)
  })
})
.catch(err => {
  console.log("I am not connected... ", err)
})

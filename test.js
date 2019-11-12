var XMLHttp.XMLHttpRequest;

var bearertoken="cLlDel9yLZdWKO1BXXjIDoQPm:GMbNW0O4bvZoQi4znMgNt5TV3W3BnoPg9vZmegakHS8Rkj52GT"
var bearertoken64="Y0xsRGVsOXlMWmRXS08xQlhYaklEb1FQbTpHTWJOVzBPNGJ2Wm9RaTR6bk1nTnQ1VFYzVzNCbm9QZzl2Wm1lZ2FrSFM4UmtqNTJHVA=="

const Http = new XMLHttpRequest();
const url='https://api.twitter.com/oauth2/token';
Http.open("POST", url);
Http.setRequestHeader("Authorization","Basic <Y0xsRGVsOXlMWmRXS08xQlhYaklEb1FQbTpHTWJOVzBPNGJ2Wm9RaTR6bk1nTnQ1VFYzVzNCbm9QZzl2Wm1lZ2FrSFM4UmtqNTJHVA==>")
Http.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8")
params='oauth_verifier=GMbNW0O4bvZoQi4znMgNt5TV3W3BnoPg9vZmegakHS8Rkj52GT'
Http.send("grant_type=client_credentials");

Http.onreadystatechange = (e) => {
  console.log("aaa")
  console.log(Http.status)
  if (this.readyState === XMLHttpRequest.DONE && Http.status === 200) {
    console.log(Http.responseText
  }
}

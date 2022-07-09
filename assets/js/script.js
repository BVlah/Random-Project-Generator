var sampleRandomUsers = [
  {
    Name: "Willibald Mast",
    Age: 29,
    Username: "orangetiger890",
    Image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    Name: "Harry Guerin",
    Age: 45,
    Username: "yellowlion888",
    Image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    Name: "Tracey Steward",
    Age: 47,
    Username: "bigbutterfly197",
    Image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
];
var sampleApiChoices = [
  {
    Name: "RandomDog",
    Description: "Random pictures of dogs",
    Link: "https://random.dog/woof.json",
  },
  {
    Name: "Cat Facts",
    Description: "Daily cat facts",
    Link: "https://alexwohlbruck.github.io/cat-facts/",
  },
  {
    Name: "The Dog",
    Description:
      "A public service all about Dogs, free to use when making your fancy new App, Website or Service",
    Link: "https://thedogapi.com/",
  },
];

// select elements to display
var userEl = document.getElementById("user-tile");
var apiEl = document.getElementById("api-tile");
var storyEl = document.getElementById("story-tile");

// global variables
var randUserList = [];
var apiList = [];
var APIcount = 3;
var userCount = 3;
// Function to call API API
var apiSquaredCall = function (choice) {
  fetch("https://api.publicapis.org/entries?category=" + choice).then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.entries.length; i++) {
          var apiEntry = {
            Name: data.entries[i].API,
            Description: data.entries[i].Description,
            Link: data.entries[i].Link,
          };
          apiList.push(apiEntry);
        }
        var apiChoices = [];
        for (i = 0; i < APIcount; i++) {
          apiChoices.push(apiList[Math.floor(Math.random() * apiList.length)]);
        }
        console.log(apiChoices);
      });
    }
  });
};

var displayApiChoices = function (apiChoices) {
  apiEl.innerHTML = "";
  var titleEl = document.createElement("p");
  titleEl.classList = "title";
  titleEl.textContent = "These APIs should do the trick!";
  apiEl.appendChild(titleEl);
  for (let i = 0; i < apiChoices.length; i++) {
    var pEl = document.createElement("p");
    var aEl = document.createElement("a");
    aEl.setAttribute("href", apiChoices[i].Link);
    aEl.setAttribute("target", "_blank");
    aEl.innerText = apiChoices[i].Link;
    pEl.classList = "subtitle";
    pEl.innerHTML = "<strong>Name:</strong> " + apiChoices[i].Name + " <br><strong>Description:</strong> " + apiChoices[i].Description + " <br><strong>Link:</strong> "
    pEl.appendChild(aEl);
    apiEl.appendChild(pEl);
    
  }
};
// apisquared("Animals");
displayApiChoices(sampleApiChoices);
// Function to call random user
var randomUserCall = function (userCount) {
  fetch("https://randomuser.me/api/1.4/?results=" + userCount).then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.results.length; i++) {
          var randomUserEntry = {
            Name: data.results[i].name.first + " " + data.results[i].name.last,
            Age: data.results[i].dob.age,
            Username: data.results[i].login.username,
            Image: data.results[i].picture.large,
          };
          randUserList.push(randomUserEntry);
        }
        console.log(randUserList);
      });
    }
  });
};

var displayUserChoices = function (randUserList) {};

// randomUserCall(userCount);
// Function to call Random text

// var randomText = function() {
//     fetch("https://api.deepai.org/api/text-generator")
// }
// Function deal with output
// const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

// deepai.setApiKey('0e5cd2e1-4ffc-42a0-a872-ecc61061a463');

// (async function() {
//     var resp = await deepai.callStandardApi("text-generator", {
//             text: "Don't_date_him-gurl",
//     });
//     console.log(resp);
// })()

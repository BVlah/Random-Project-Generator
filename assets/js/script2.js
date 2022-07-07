
var apiList = [];

// Function to call API API
var apisquared = function (choice) {
  fetch("https://api.publicapis.org/entries?category=" + choice).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.entries.length; i++) {
            if (data.entries[i].Category === choice) {
                var apiEntry = {Name: data.entries[i].API, Description: data.entries[i].Description, Link: data.entries[i].Link};
                apiList.push(apiEntry);
            }
        }
      });
      console.log(apiList)
      var apiChoice = apiList[Math.floor(Math.random() * apiList.length)];
      console.log(apiChoice);
    }
  });
};

// apisquared("Animals");


// // Function to call random user
// var randomUser = function(number,) {

//     var apiUrl = "https://randomuser.me/api/1.4/" + number

// }
// Function to call Random text

// Function deal with output

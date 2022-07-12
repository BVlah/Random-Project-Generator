// global project variables
var projects = [];
var currentProject = {};

// Textarea declarations
var textAreaEl = document.createElement("textarea");
textAreaEl.classList = "textarea"
textAreaEl.setAttribute("rows", "10"); 

// select elements to display
var buttonPanelEl = document.getElementById("button-area");
var userEl = document.getElementById("user-tile");
var apiEl = document.getElementById("api-tile");
var storyEl = document.getElementById("story-tile");
var saveButtonEl = document.getElementById("save");

var loadProjectButtons = function () {
  projects = JSON.parse(localStorage.getItem("projects"));
  buttonPanelEl.innerHTML = "";
  if (projects) {
    for (var i = 0; i < projects.length; i++) {
      var buttonDivEl = document.createElement("div");
      buttonDivEl.classList = "buttons"
      buttonDivEl.setAttribute("id", i);
      buttonPanelEl.appendChild(buttonDivEl);

      var newButtonEl = document.createElement("button");
      newButtonEl.classList = "button is-primary m-2 is-medium loadButton";
      newButtonEl.textContent = projects[i].title;
      buttonDivEl.appendChild(newButtonEl);

      var deleteButtonEl = document.createElement("button");
      deleteButtonEl.classList = "button is-danger m-2 is-medium deleteButton";
      deleteButtonEl.innerHTML = "<span class='icon is-small'><i class='fa-solid fa-trash-can'></i></i>";
      buttonDivEl.appendChild(deleteButtonEl);
    }
  } else projects = [];
};

// Open Modal
$("#start-project").on("click", function () {
  $("#project-modal")[0].classList.add("is-active");

  // Clear previous values
  $("#modalTeammates, #modalProjectTitle").val("");
  $("#modalCategory").val("Select One");
});

// Submit Button in Modal Clicked
$("#project-form-modal").click(function (event) {
  event.preventDefault();
  textAreaEl.value = "";
  // get form values
  var projectTeammates = $("#modalTeammates").val();
  var projectCategory = $("#modalCategory").val();
  var projectTitle = $("#modalProjectTitle").val();

  if (projectCategory != "Select One" && projectTitle && projectTeammates) {
    // close modal
    $("#project-modal")[0].classList.remove("is-active");

    randomUserCall(projectTeammates);
    displayProjectName(projectTitle)
    apiSquaredCall(projectCategory);

  } else alert("Please fill out all info!");
});

// Add additional click events to close modal
$(".modal-background, .modal-close").click(function (event) {
  event.preventDefault();

  $("#project-modal")[0].classList.remove("is-active");
});


// API API Call
var apiSquaredCall = function (choice) {
  var apiList = [];
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
        for (i = 0; i < 3; i++) {
          apiChoices.push(apiList[Math.floor(Math.random() * apiList.length)]);

          //add conditional to check for duplicates
        }

        displayTileHeader(choice);
        displayApiChoices(apiChoices);
      });
    }
  });
};

// Project Name & Story Display
var displayProjectName = function(projectTitle) {
  currentProject.title = projectTitle;
  storyEl.innerHTML = "";
  var titleEl = document.createElement("p");
  var pEl = document.createElement("p");
  var subtitleEl = document.createElement("p");
  // textAreaEl.classList = "textarea"
  // textAreaEl.setAttribute("rows", "10"); 
  titleEl.classList = "title is-3";
  pEl.classList = "subtitle is-5";
  subtitleEl.classList = "subtitle is-5"
  titleEl.textContent = "About " + projectTitle;
  pEl.innerHTML = "Use the list of random users to help visualize your user story. <br> <br>Use the list of APIs to formulate a high-tech solution."
  subtitleEl.textContent = "Then, use the area below to stash your ideas!"
  storyEl.appendChild(titleEl);
  storyEl.appendChild(pEl);
  storyEl.appendChild(subtitleEl);
  storyEl.appendChild(textAreaEl);
};

// Display API header
var displayTileHeader = function (choice) {
  currentProject.subject = choice;
  apiEl.innerHTML = "";
  var titleEl = document.createElement("p");
  titleEl.classList = "title is-5";
  titleEl.textContent =
    "These APIs are perfect for your " + choice + " project!";
  apiEl.appendChild(titleEl);
};

// Display API Choices
var displayApiChoices = function (apiChoices) {
  currentProject.apis = apiChoices;
  for (let i = 0; i < apiChoices.length; i++) {
    var divEl = document.createElement("article");
    divEl.classList = "my-2";
    var pHeadEl = document.createElement("p");
    var pSubEl = document.createElement("p");
    var aEl = document.createElement("a");
    aEl.setAttribute("href", apiChoices[i].Link);
    aEl.setAttribute("target", "_blank");
    pHeadEl.classList = "title is-4";
    pHeadEl.innerHTML = apiChoices[i].Name;
    pSubEl.classList = "subtitle is-5";
    pSubEl.textContent = apiChoices[i].Description;
    aEl.appendChild(pHeadEl);
    divEl.appendChild(aEl);
    divEl.appendChild(pSubEl);
    apiEl.appendChild(divEl);
  }
};

// Function to call random user
var randomUserCall = function (userCount) {
  var randUserList = [];
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

        displayUserChoices(randUserList);
      });
    }
  });
};

// Display Users
var displayUserChoices = function (randUserList) {
  currentProject.users = randUserList;
  userEl.innerHTML = "";
  var titleEl = document.createElement("p");
  titleEl.classList = "title is-3";
  titleEl.textContent = "Meet your users!";
  userEl.appendChild(titleEl);
  for (let i = 0; i < randUserList.length; i++) {
    var mediaEl = document.createElement("div");
    mediaEl.classList =
      "media is-justify-content-center is-flex-direction-row-reverse";
    userEl.appendChild(mediaEl);
    var mediaLeftEl = document.createElement("div");
    mediaLeftEl.classList = "media-left";
    mediaEl.appendChild(mediaLeftEl);
    var figureEl = document.createElement("figure");
    figureEl.classList = "image is-64x64";
    mediaLeftEl.appendChild(figureEl);
    var imgEl = document.createElement("img");
    imgEl.classList = "is-rounded";
    imgEl.setAttribute("src", randUserList[i].Image);
    imgEl.setAttribute("alt", "profile image of" + randUserList[i].Name);
    figureEl.appendChild(imgEl);
    var mediaContentEl = document.createElement("div");
    mediaContentEl.classList = "media-content media-left";
    mediaEl.appendChild(mediaContentEl);
    var nameEl = document.createElement("p");
    nameEl.classList = "title is-5";
    nameEl.textContent = randUserList[i].Name;
    mediaContentEl.appendChild(nameEl);
    var usernameEl = document.createElement("p");
    usernameEl.classList = "subtitle is-6";
    usernameEl.textContent = "@" + randUserList[i].Username;
    mediaContentEl.appendChild(usernameEl);
  }
};

// Save Project to Local Storage
var saveProject = function () {
  currentProject.text = textAreaEl.value;
  var match = "";

  if (projects.length > 0) {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].title === currentProject.title) {
        match = true
        projects.splice(i, 1, currentProject);
      }
    }
    if (!match || !projects.length) {
      projects.push(currentProject);
    }
  } else {
      projects.push(currentProject);
  };
  localStorage.setItem("projects", JSON.stringify(projects));
  loadProjectButtons();
};

// Load Project from Local Storage
var selectProject = function (event) {
    textAreaEl.value = "";
    var selectedButton = event.target.textContent;
    for (var i = 0; i < projects.length; i++) {
      if (selectedButton === projects[i].title) {
        displayTileHeader(projects[i].subject);
        displayApiChoices(projects[i].apis);
        displayUserChoices(projects[i].users);
        displayProjectName(projects[i].title);
        if (projects[i].text) {
        textAreaEl.value = projects[i].text;}
      }
  }
};

// Delete Buttons
$(document).on("click", ".deleteButton", function() {
  var removedProject = $(this).siblings()[0].textContent;
  var updatedProjectsArr = [];

  for (var i=0; i<projects.length; i++) {
    if (projects[i].title !== removedProject) {
      updatedProjectsArr.push(projects[i]);
    }
  }
  projects = updatedProjectsArr;
  localStorage.setItem("projects", JSON.stringify(projects));
  loadProjectButtons();
});

loadProjectButtons();
saveButtonEl.addEventListener("click", saveProject);
buttonPanelEl.addEventListener("click", selectProject);
//API Calls - Use Sparingly
// randomUserCall(userCount);
// apiSquaredCall("Business");

// Display Samples - For Testing Purposes
// displayUserChoices(sampleRandomUsers);
// displayApiChoices(sampleApiChoices);

var projects = [];

// Open Modal
$("#start-project").on("click", function() {
    $('#project-modal')[0].classList.add('is-active');
});


 // Submit Button in Modal Clicked
 $("#project-form-modal").click(function(event) {
    event.preventDefault()
    // get form values
    var projectTeammates = $("#modalTeammates").val();
    var projectCategory = $("#modalCategory").val();
    var projectBackstory = $("#modalBackstory").val();

    if (projectCategory != "Select One" && projectBackstory && projectTeammates) {
        
      // close modal
      $("#project-modal")[0].classList.remove('is-active');

      // save in projects array
      projects.push({
        teammates: projectTeammates,
        category: projectCategory,
        backstory: projectBackstory
      });
      console.log(projects);
    }
    else alert("Please fill out all info!");
 });

// Add additional click events to close modal
$('.modal-background, .modal-close').click(function(event) {
    event.preventDefault();

    $("#project-modal")[0].classList.remove('is-active');
});
/*Global variables*/
var $inputTitle = $('#title');
var $inputBody = $('#body');
var inputFields = ('#title, #body');
var submitButton = $('#submit');
var searchInput = $('#search');
var $titleElement = $('.idea-title');
var $bodyElement = $('.idea-body');
var ideaTextElements = ('.idea-title, .idea-body');
var $ideaQualityElement = $('.idea-quality-value');
var deleteButton = $('.idea-delete');
var voteUpButton = $('.idea-up');
var voteDownButton = $('.idea-down');
var bottomSection = $('.section-bottom');
var maxID = 0;

/*On load statements*/
$('#title').focus();
$(submitButton).prop('disabled', true);


/*Event Listeners*/

// this listener works
$(inputFields).on('keyup', function() {
  console.log('toggle button disabled');
  toggleButtonDisabled();
})

// this listener works
$(submitButton).on('click', function(event) { 
  event.preventDefault();
  console.log(2);
  prependIdeasToList();
  $(inputFields).val('');

});

// this listener works
$(searchInput).on('keyup', function() {
  console.log('search clicked');
})

// this listener works
$(bottomSection).on('click', ideaTextElements, function() {
  // console.log('idea clicked');
  // editIdeaText();
  $(this).attr('contenteditable','true');
  $(this).keypress(function(event) {
    if(event.which == 13) {
        $(this).blur();
    };
  });
});

// this listener works
$(bottomSection).on('click', '.idea-delete', function () {
  console.log('delete clicked');
  $(this).parent('article').remove();

})

// this listener works
$(bottomSection).on('click', '.idea-up', function () {
  console.log('vote up clicked');

})

// this listener works
$(bottomSection).on('click', '.idea-down', function () {
    console.log('vote down clicked');

})

/*Functions*/

function toggleButtonDisabled() {
  if($('#title').val() && $('#body').val()) {
    console.log('enable');
    $(submitButton).prop('disabled', false);
  } else {
    console.log('disable');
    $(submitButton).prop('disabled', true);
  }
  // if ($('#title').val() === '' && $('#body').val() === '') {
  //   $('.enable-button').prop('disabled', true);
  //   } else if ($('title').val() ==='' || $('#body').val() === '') {
  //   $('enable-button').prop('disabled', true);
  // } else {    
  //   $('.enable-button').prop('disabled', false);
  // }
};
 
function prependIdeasToList() {
  var titleInput = $('#title').val();
  var bodyInput = $('#body').val();
  var ideaQualityValue = 1;
  setNewIdea();
  console.log(maxID);
  $('.section-bottom').prepend(`
    <article>
        <h2 class="idea-title"> ${titleInput} 1</h2>
        <input type="image" src="images/delete.svg" class="idea-delete" value="X">
        <p class="idea-body">${bodyInput}</p>
        <input type="image" src="images/upvote.svg" class="idea-up">
        <input type="image" src="images/downvote.svg" class="idea-down">
        <h3 class="idea-quality-heading">quality:  <a class="idea-quality-value">${ideaQualityValue}</a></h3>
        <hr>
    </article>   
`)
  $('#title').focus();
};

function editIdeaText() {
  $(this).attr('contenteditable','true');
  $(this).keypress(function(event) {
    if(event.which == 13) {
        $(this).blur();
    };
  });
};

function setNewIdea() {
  console.log('new idea function called');
  maxID = maxID + 1;
  console.log('max ID is currently ' + maxID)
  var newIdeaObject = {
    title: $inputTitle.val(),
    body: $inputBody.val(),
    quality: 1
  }
  var stringifiedNewIdeaObject = JSON.stringify(newIdeaObject);
  localStorage.setItem(maxID, stringifiedNewIdeaObject);
  localStorage.getItem(maxID);
  console.log(localStorage.getItem(maxID));
}

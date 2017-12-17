/*Global variables*/
var inputFields = ('#title, #body');
var submitButton = $('#submit');
var searchInput = $('#search');
var $titleElement = $('.idea-title');
var $bodyElement = $('.idea-body');
var ideaTextElements = ('.idea-title, .idea-body');
var deleteButton = $('.idea-delete');
var voteUpButton = $('.idea-up');
var voteDownButton = $('.idea-down');

var bottomSection = $('.section-bottom');

/*On load statements*/
$('#title').focus();

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

})

// this listener works
$(searchInput).on('keyup', function() {
  console.log('search clicked');
})

// this listener works
$(bottomSection).on('click', ideaTextElements, function () {
  console.log('idea clicked');

})

// this listener works
$(bottomSection).on('click', '.idea-delete', function () {
  console.log('delete clicked');

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
  if ($('#title').val() === '' && $('#body').val() === '') {
    $('.enable-button').prop('disabled', true);
    } else if ($('title').val() ==='' || $('#body').val() === '') {
    $('enable-button').prop('disabled', true);
  } else {    
    $('.enable-button').prop('disabled', false);
  }
};
 


function prependIdeasToList() {
  var titleInput = $('#title').val();
  var bodyInput = $('#body').val();
  // event.preventDefault();
  // the variables below don't work, but they pass
  $('.section-bottom').prepend(`
    <article>
        <h2 class="idea-title"> ${titleInput} 1</h2>
        <input type="image" src="images/delete.svg" class="idea-delete" value="X">
        <p class="idea-body">${bodyInput}</p>
        <input type="image" src="images/upvote.svg" class="idea-up">
        <input type="image" src="images/downvote.svg" class="idea-down">
        <h3 class="idea-quality-heading">quality: <a class="idea-quality-value">swill</a></h3>
        <hr>
    </article>   
`)
};
/*Global variables*/
var $titleInput = $('#title').val();
var $bodyInput = $('#body').val();
var $inputFields = ['#title, #body'];
var $submitButton = $('#submit');
var $searchInput = $('#search');
var $titleElement = $('.idea-title');
var $bodyElement = $('.idea-body');
var $ideaTextElements = ['.idea-title, .idea-body'];
var $deleteButton = $('.idea-delete');
var $voteUpButton = $('.idea-up');
var $voteDownButton = $('.idea-down');

/*On load statements*/
$('#title').focus();

/*Event Listeners*/
$('#title, #body').on('keyUp', function() {
  console.log('toggle button disabled');
  toggleButtonDisabled();
})

$('#submit').on('click', function(event) { 
  console.log(2);
  prependIdeasToList ();

})

$('#search').on('keyup', function() {

})

$('.idea-body, .idea-body').on('click', function() {

})

$('.idea-delete').on('click', function() {

})

$('.idea-up').on('click', function() {

})

$('.idea-down').on('click', function() {
  
})

/*Functions*/

function toggleButtonDisabled() {
  if ($('#title').val() === '' && $('#body').val() === '') {
    $('.enable-button').prop('disabled', true);
    } else if ($('title').val() ==='' || $('#body').val() === '') {
    $('enable-button').prop('disabled', true);
  } else {    
    $(.enable-button).prop('disabled', false);
  }
};
 


function prependIdeasToList () {
  event.preventDefault();
  parent.prepend($("article"));
}
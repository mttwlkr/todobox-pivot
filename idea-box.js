/*Global variables*/
var $titleInput = $('#title');
var $bodyInput = $('#body');
var $inputFields = ['$titleInput, $bodyInput'];
var $submitButton = $('#submit');
var $searchInput = $('#search');
var $titleElement = $('.idea-title');
var $bodyElement = $('.idea-body');
var $ideaTextElements = ['$titleElement, $bodyElement'];
var $deleteButton = $('.idea-delete');
var $voteUpButton = $('.idea-up');
var $voteDownButton = $('.idea-down');

/*On load statements*/
$titleInput.focus();

/*Event Listeners*/
$inputFields.on('keyup', function() {
  console.log('toggle button disabled');
  toggleButtonDisabled();
})

$submitButton.on('click', function(event) {
  event.preventDefault;

})

$searchInput.on('keyup', function() {

})

$ideaTextElements.on('click', function () {

})

$deleteButton.on('click', function() {

})

$voteUpButton.on('click', function() {

})

$voteDownButton.on('click', function() {
  
})

/*Functions*/

function toggleButtonDisabled() {
  if () {

    } else {

    }
  }
;
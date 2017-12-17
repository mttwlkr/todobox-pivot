/*Global variables*/
var $titleInput = $('#title').val();
var $bodyInput = $('#body').val();
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
  prependIdeasToList ();

})

$searchInput.on('keyup', function() {

})

$ideaTextElements.on('click', function() {

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

function prependIdeasToList () {

  parent.prepend(`
    <article>
        <h2 class="idea-title">${titleInput}</h2>
        <input type="image" src="images/delete.svg" class="idea-delete" value="X">
        <p class="idea-body">${bodyInput}</p>
        <input type="image" src="images/upvote.svg" class="idea-up">
        <input type="image" src="images/downvote.svg" class="idea-down">
        <h3 class="idea-quality-heading">quality: <a class="idea-quality-value">swill</a></h3>
        <hr>
      </article>                                    
`);
}
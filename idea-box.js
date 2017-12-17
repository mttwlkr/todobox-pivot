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
  event.preventDefault;
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
//   if () {

//     } else {

//     }
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
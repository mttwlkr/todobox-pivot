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
$(submitButton).prop('disabled', true);

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
  // event.preventDefault();
  // the variables below don't work, but they pass
  
  $('.prepend').prepend(`
    <article>
        <h2 class="idea-title"> ${titleInput} 1</h2>
        <input  class="idea-delete" value="X">
        <p class="idea-body">${bodyInput}</p>
        <input type="image" src="images/upvote.svg" class="idea-up">
        <input type="image" src="images/downvote.svg" class="idea-down">
        <h3 class="idea-quality-heading">quality: <a class="idea-quality-value">swill</a></h3>
        <hr>
    </article>   
`)
};

function editIdeaText() {
  $(this).attr('contenteditable','true');
  $(this).keypress(function(event) {
    if(event.which == 13) {
        $(this).blur();
    };
  });
};

// // var changeUp = function () {
//   $('.idea-up').hover(function() {
//       $('.idea-up').attr('src', 'images/upvote-hover.svg');
//     }function() {
//       $(.'idea-up').attr('src', 'images/upvote.svg');
//     }

//     })
// }

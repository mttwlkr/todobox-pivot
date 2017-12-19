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

// this listener and its function work
$(inputFields).on('keyup', function() {
  console.log('toggle button disabled');
  toggleButtonDisabled();
})

// this listener and its function work
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

// this listener and its functions work, but does not work using named function
$(bottomSection).on('click', ideaTextElements, function() {
  // console.log('idea clicked');
  // editIdeaText();
  $(this).attr('contenteditable','true');
  $(this).keypress(function(event) {
    if(event.which == 13) {
      console.log('now I will take the new innerText and update local storage')
      var itemID = $(this).parent().attr('id');
      var quality = $(this).parent().attr('quality');


//normalize the rest of this in a named function so it can be used to udpate quality too
//need to add if this is voteup or votedown to if statement
      if ($(this).hasClass('idea-title')) {
        // console.log('title');
        var $title = $(this).text();
        var $body = $(this).siblings('.idea-body').text();
      } else {
        // console.log('body')
        var $title = $(this).siblings('.idea-title').text();
        var $body = $(this).text();
      }
      var updatedValues = {
          id: itemID,
          title: $title,
          body: $body,
          quality: quality
      }
      var stringifiedUpdatedIdea = JSON.stringify(updatedValues);
      localStorage.setItem(itemID, stringifiedUpdatedIdea);
      console.log(localStorage.getItem(itemID));
      $(this).blur();
    };
  });
});

// this listener works, but need to add "remove from local storage" function
$(bottomSection).on('click', '.idea-delete', function () {
  console.log('delete clicked');
  $(this).parent('article').remove();

})

// this listener works; need to display updated quality and limit quality range
$(bottomSection).on('click', '.idea-up', function () {
  console.log('vote up clicked');
  var quality = $(this).parent().attr('quality');
  console.log('old quality' + quality);
  var quality = parseInt(quality) + 1;
  console.log('new quality' + quality);
  $(this).parent().attr('quality',quality);
// add statement here to update quality on local storage

    // WTF?  I just want update the text displayed for quality to show the new quality
    // $(this).siblings('.idea-quality-value').text(quality);
    // document.querySelector('span').nextSibling.textContent = quality;
    // $(".idea-quality-value > i")[0].nextSibling.nodeValue = quality;
    // $(this).closest('span').text(quality);
    // $(this).siblings('span').text(quality);

})

// this listener works; need to display updated quality and limit quality range
$(bottomSection).on('click', '.idea-down', function () {
    console.log('vote down clicked');
    var quality = $(this).parent().attr('quality');
    console.log('old quality' + quality);
    var quality = parseInt(quality) - 1;
    console.log('new quality' + quality);
    $(this).parent().attr('quality',quality);
// add statement here to update quality on local storage    
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
  var qualityAttributeValue = 1;
  setNewIdea();
  console.log(maxID);
  console.log('quality attribute is' + qualityAttributeValue);
  $('.section-bottom').prepend(`
    <article id = ` + maxID + ` quality = "1">
        <h2 class="idea-title">${titleInput}</h2>
        <input type="image" src="images/delete.svg" class="idea-delete" value="X">
        <p class="idea-body">${bodyInput}</p>
        <input type="image" src="images/upvote.svg" class="idea-up">
        <input type="image" src="images/downvote.svg" class="idea-down">
        <h3 class="idea-quality-heading">quality:  <span class="idea-quality-value">${qualityAttributeValue}</span></h3>
        <hr>
    </article>   
`)
  var qualityAttributeValue = $(this).attr('quality')
  $('#title').focus();
};

function prependOnload() {
//vars for each key
storage.getItem.
//var for entire local storage array
var storage = localStorage
//for loop to run function for each item
//prepend like above, use actual values
//update id and quality attributes before continuing loop
}

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
    id: maxID,
    title: $inputTitle.val(),
    body: $inputBody.val(),
    quality: 1
  }
  var stringifiedNewIdeaObject = JSON.stringify(newIdeaObject);
  localStorage.setItem(maxID, stringifiedNewIdeaObject);
  localStorage.getItem(maxID);
  console.log(localStorage.getItem(maxID))
  console.log(stringifiedNewIdeaObject);
}


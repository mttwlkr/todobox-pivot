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
var maxID = localStorage.length;

/*On load statements*/
// $('#title').focus();
// $(submitButton).prop('disabled', true);

// function loadIdeas() {
 for (i=0; i < localStorage.length; i++) {
   var key = localStorage.key(i);
   var item = JSON.parse(localStorage.getItem(key));
   var id = item.id;
   var title = item.title;
   var body = item.body;
   var quality = item.quality;
      $('.prepend').prepend(`
    <article id = "${id}" quality = "0">
         <h2 class="idea-title">${title}</h2>
         <input type="image" src="images/delete.svg" class="idea-delete" value="X">
         <p class="idea-body">${body}</p>
         <input type="image" src="images/upvote.svg" class="idea-up">
         <input type="image" src="images/downvote.svg" class="idea-down">
         <p class="idea-quality-value">${quality}</p>
        <hr>
    </article>   
 `) 
}
 
// }

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
    if(event.which == 13){
      setEditedText()
  $(this).blur(function(){ 
    console.log("shit");
      setEditedText()
console.log('what?');
      })
    }
  })
})


function setEditedText() {
      var itemID = $(this).parent().attr('id');
      var quality = $(this).parent().attr('quality');
      if ($(this).hasClass('idea-title')) {
        var $title = $(this).text();
        var $body = $(this).siblings('.idea-body').text();
      } else {
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

// this listener works, but need to add "remove from local storage" function
$(bottomSection).on('click', '.idea-delete', function () {
  console.log('idea-delete');
  $(this).parent('article').remove();
  // $(this).maxID().remove();
  var key = $(this).parent().attr('id');
  console.log(key);
  localStorage.removeItem(key);
})

$(bottomSection).on('click', '.idea-up', function () {
  console.log('vote up clicked');
  var quality = $(this).parent().attr('quality');
  console.log('old quality' + quality);
  if (quality < 2) {
  quality = parseInt(quality) + 1;
  console.log('new quality' + quality);
  $(this).parent().attr('quality',quality);
  }
      if(quality < 1){
      $(this).siblings('.idea-quality-value').text('Quality: Swill');
      console.log($(this).text());
      console.log(quality);
    } else if  
      (quality == 1){
      $(this).siblings('.idea-quality-value').text('Quality: Plausible');
    } else if 
      (quality > 1){
      $(this).siblings('.idea-quality-value').text('Quality: Genius');
      } else {
      console.log('do shit')
  } 

 // upAndDownChange(quality); 
})

$(bottomSection).on('click', '.idea-down', function () {
    console.log('vote down clicked');
    var quality = $(this).parent().attr('quality');
    console.log('old quality' + quality);
    if (quality > 0){
    quality = parseInt(quality) - 1;
    console.log('new quality' + quality);
    $(this).parent().attr('quality',quality);
//   }
//     upAndDownChange(quality); 
// })

//     function upAndDownChange(quality) {
    if(quality < 1){
      $(this).siblings('.idea-quality-value').text('Quality: Swill');
      console.log($(this).text());
      console.log(quality);
    } else if  
      (quality == 1){
      $(this).siblings('.idea-quality-value').text('Quality: Plausible');
    } else if 
      (quality > 1){
      $(this).siblings('.idea-quality-value').text('Quality: Genius');
      } else {
      console.log('do shit')
  } 
 }})

/*Functions*/

function toggleButtonDisabled() {
  if($('#title').val() && $('#body').val()) {
    console.log('enable');
    $(submitButton).prop('disabled', false);
  } else {
    console.log('disable');
    $(submitButton).prop('disabled', true);
  }
};
 

function prependIdeasToList() {
  var titleInput = $('#title').val();
  var bodyInput = $('#body').val();
  setNewIdea();
  console.log(maxID);
  $('.prepend').prepend(`
    <article id = ` + maxID + ` quality = "0">
        <h2 class="idea-title">${titleInput}</h2>
        <input type="image" src="images/delete.svg" class="idea-delete" value="X">
        <p class="idea-body">${bodyInput}</p>
        <input type="image" src="images/upvote.svg" class="idea-up">
        <input type="image" src="images/downvote.svg" class="idea-down">
        <h3 class="idea-quality-heading">quality:  <span class="idea-quality-value">Swill</span></h3>
        <hr>
    </article>   
`)
  var qualityAttributeValue = $(this).attr('quality')
  $('#title').focus();
};


function setNewIdea() {
  console.log('new idea function called');
  maxID ++;
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
};


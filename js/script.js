loadIdeas();
$('#title').focus();
$('#form').on('keyup', '#title, #body', toggleButtonDisabled);
$('#submit').on('click', prependIdeasToList);
$('.section-bottom').on('blur', '.idea-title', updateTitle); 
$('.section-bottom').on('blur', '.idea-body', updateBody);
$('.section-bottom').on('click', '.idea-delete', deleteButton);
$('.section-bottom').on('click', '.idea-up', upVote);
$('.section-bottom').on('click', '.idea-down', downVote);
$('#search').on('keyup', filterCards);

function loadIdeas() {
  for (i=0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var item = getCardId(key);
    prependCard(item, qualityDesc);
    var qualityDesc = qualityAdjust(item, key);
  };
};

function SetNewIdea(title, body) {
    this.id = (new Date).getTime();
    this.title = title;
    this.body = body;
    this.quality = 0;
}

function prependIdeasToList(event) {
  event.preventDefault();
  var newIdea = new SetNewIdea($('#title').val(), $('#body').val());
  prependCard(newIdea, 'Quality: Swill');
  setCardId(newIdea.id, newIdea);
  clearForm();
};

function prependCard (newIdea, quality) {
  $('.prepend').prepend(`<article id = ${newIdea.id}><button class="idea-delete button"></button>
    <h2 contenteditable="true" class="idea-title">${newIdea.title}</h2>
    <p contenteditable="true" class="idea-body">${newIdea.body}</p>
    <button class="idea-up button"></button><button class="idea-down button"></button>
    <p class="idea-quality-value">${quality}<p><hr></article>`)
}

function toggleButtonDisabled() {
  if($('#title').val() !== '' && $('#body').val() !== '') {
    $('#submit').prop('disabled', false);
  } 
};

function clearForm () {
  $('#title').focus();
  $('#submit').prop('disabled', true)
  $('#title, #body').val('');
}

function getCardId (key) {
  var storedCard = localStorage.getItem(key);
  var item = JSON.parse(storedCard);
  return item;
}

function setCardId (key, newIdea) {
  var stringifiedNewIdeaObject = JSON.stringify(newIdea);
  localStorage.setItem(key, stringifiedNewIdeaObject);
}

function updateTitle() {
  var key = $(this).parent().attr('id');
  var item = getCardId(key);
  item.title = $(this).text();
  setCardId(key, item);
};

function updateBody() {
  var key = $(this).parent().attr('id');
  console.log($(this));
  var item = getCardId(key); 
  item.body = $(this).text();
  setCardId(key, item);
}

function deleteButton() {
  $(this).parent('article').remove();
  var key = $(this).parent().attr('id');
  localStorage.removeItem(key);
};

function upVote () {
  var key = $(this).parent().attr('id');
  var item = getCardId(key);
  item.quality = upVoteMax(item);
  qualityAdjust(item, key);
  setCardId(key, item);
};

function upVoteMax (item) {
  if (item.quality < 2) {
    item.quality++;
    return item.quality;
  }else if (item.quality === 2){
    return item.quality;
  }
}

function downVote () {
  var key = $(this).parent().attr('id');
  var item = getCardId(key);
  item.quality = downVoteMax(item);
  qualityAdjust(item, key);
  setCardId(key, item);
};

function downVoteMax(item){
  if(item.quality > 0){
    item.quality--;
    return item.quality;
  }else if(item.quality === 0){
    return item.quality;
  }
}

function qualityAdjust (item, key) {
  if(item.quality < 1){
    $(`#${key}`).children('.idea-quality-value').text('Quality: Swill');
  } else if (item.quality == 1){
    $(`#${key}`).children('.idea-quality-value').text('Quality: Plausible');
  } else if (item.quality > 1){
    $(`#${key}`).children('.idea-quality-value').text('Quality: Genius');
  };
  var qualityDesc = $(`#${key}`).children('.idea-quality-value').text();
  return qualityDesc;
};

function filterCards () {
  var filter = $('#search').val();
  var title = $('.idea-title');
  var body = $('.idea-body');
  for (var i = 0; i < title.length; i++) {
    $(title[i]).parent('article').hide();
    if ($(title[i]).text().includes(filter) || $(body[i]).text().includes(filter)) {
      $(title[i]).parent('article').show();
    }
  }
}





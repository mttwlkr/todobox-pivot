var array = [{id:4, name: 'Importance: Critical'},{id:3, name: 'Importance: High'},
  {id:2, name: 'Importance: Normal'},{id:1, name: 'Importance: Low'},{id:0, name: 'Importance: None'}];

loadCard();
$('#title').focus();
$('#form').on('keyup', '#title, #task', enableSaveButton);
$('#submit').on('click', createCard);
$('.section-bottom').on('blur', '.todo-title', updateTitle); 
$('.section-bottom').on('blur', '.todo-task', updateTask);
$('.section-bottom').on('click', '.todo-delete', deleteButton);
$('.section-bottom').on('click', '.todo-up', upVote);
$('.section-bottom').on('click', '.todo-down', downVote);
$('#filter').on('keyup', filterCards);

function loadCard() {
  for (i=0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var cardObject = getCardId(key);
    var importanceDescription = importanceAdjust(cardObject, key);
    prependCard(cardObject, importanceDescription);
  };
};

function SetNewToDo(title, task) {
    this.id = (new Date).getTime();
    this.title = title;
    this.task = task;
    this.importance = 2;
}

function createCard(event) {
  event.preventDefault();
  var newToDo = new SetNewToDo($('#title').val(), $('#task').val());
  prependCard(newToDo, 'Importance: Normal');
  setCardId(newToDo.id, newToDo);
  clearForm();
};

function prependCard (newToDo, importance) {
  $('.prepend').prepend(`<article id = ${newToDo.id}><button class="todo-delete button"></button>
    <h2 contenteditable="true" class="todo-title">${newToDo.title}</h2>
    <p contenteditable="true" class="todo-task">${newToDo.task}</p>
    <button class="todo-up button"></button><button class="todo-down button"></button>
    <p class="todo-importance-value">${importance}<p><hr></article>`)
}

function enableSaveButton() {
  if($('#title').val() !== '' && $('#task').val() !== '') {
    $('#submit').prop('disabled', false);
  } 
};

function clearForm () {
  $('#title').focus();
  $('#submit').prop('disabled', true)
  $('#title, #task').val('');
}

function getCardId (key) {
  var storedCard = localStorage.getItem(key);
  var cardObject = JSON.parse(storedCard);
  return cardObject;
}

function setCardId (key, newToDo) {
  var stringifiedNewToDoObject = JSON.stringify(newToDo);
  localStorage.setItem(key, stringifiedNewToDoObject);
}

function updateTitle() {
  var key = $(this).parent().attr('id');
  var cardObject = getCardId(key);
  cardObject.title = $(this).text();
  setCardId(key, cardObject);
};

function updateTask() {
  var key = $(this).parent().attr('id');
  console.log($(this));
  var cardObject = getCardId(key); 
  cardObject.task = $(this).text();
  setCardId(key, cardObject);
}

function deleteButton() {
  $(this).parent('article').remove();
  var key = $(this).parent().attr('id');
  localStorage.removeItem(key);
};

function upVote () {
  var key = $(this).parent().attr('id');
  var cardObject = getCardId(key);
  cardObject.importance = upVoteMax(cardObject);
  importanceAdjust(cardObject, key);
  setCardId(key, cardObject);
};

function upVoteMax (cardObject) {
  if (cardObject.importance < 4) {
    cardObject.importance++;
    return cardObject.importance;
  }else if (cardObject.importance === 4){
    return cardObject.importance;
  }
}

function downVote () {
  var key = $(this).parent().attr('id');
  var cardObject = getCardId(key);
  cardObject.importance = downVoteMax(cardObject);
  importanceAdjust(cardObject, key);
  setCardId(key, cardObject);
};

function downVoteMax(cardObject){
  if(cardObject.importance > 0){
    cardObject.importance--;
    return cardObject.importance;
  }else if(cardObject.importance === 0){
    return cardObject.importance;
  }
}

function importanceAdjust (cardObject, key) {
  var importance = cardObject.importance;
  var arr = importanceSearch(array, importance);
  $(`#${key}`).children('.todo-importance-value').text(arr[0].name);
  var importanceDescription = arr[0].name;
  return importanceDescription;
};

function filterCards () {
  var filter = $('#filter').val();
  var title = $('.todo-title');
  var task = $('.todo-task');
  for (var i = 0; i < title.length; i++) {
    $(title[i]).parent('article').hide();
    if ($(title[i]).text().includes(filter) || $(task[i]).text().includes(filter)) {
      $(title[i]).parent('article').show();
    }
  }
}

function importanceSearch (a, q) {
  var arr = $.grep(a, function(a) {
    var arr = a.id === q;
    return arr; 
  }) 
  return arr;
}




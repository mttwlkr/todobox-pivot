var array = [{id:4, name: 'Importance: Critical'},{id:3, name: 'Importance: High'},
  {id:2, name: 'Importance: Normal'},{id:1, name: 'Importance: Low'},{id:0, name: 'Importance: None'}];

var completedArray = [{id:0, name: 'task-incomplete parent-article'}, {id: 1, name:'task-completed parent-article'}]

if (localStorage.length < 10) {
  pageLoadCard(0)
} else {
  pageLoadCard(localStorage.length - 10);  
};

pageLoadPastDueCards();

$('#title').focus();
$('#form').on('keyup', '#title, #task', enableSaveButton);
$('#submit').on('click', createCard);
$('.section-bottom').on('blur', '.todo-title', updateTitle); 
$('.section-bottom').on('blur', '.todo-task', updateTask);
$('.section-bottom').on('click', '.todo-delete', deleteButton);
$('.section-bottom').on('click', '.todo-up', upVote);
$('.section-bottom').on('click', '.todo-down', downVote);
$('.section-bottom').on('click', '.complete-button', taskComplete);
$('.section-bottom').on('click', '.completed', resumeTask);
$('.show-completed').on('click', showCompletedCards);
$('.show-more-todo').on('click', loadMoreCards);
$('#filter').on('keyup', filterCards);
$('fieldset').on('change', '#critical, #high, #normal, #low, #none', sortByImportance);
$('#title').on('keyup', titleCount);
$('#task').on('keyup', taskCount);


function titleCount() {
  var numOfTitleCharacters = ($('#title').val().length);
  $('.title-count').text(numOfTitleCharacters); 
}

function taskCount() {
  var numOfTaskCharacters = ($('#task').val().length);
  $('.task-count').text(numOfTaskCharacters);
}

function sortByImportance() {
  var filterArr = $("input[type='checkbox']");
  var importance = $('.todo-importance-value');
  var checkedBoxesArr = filterArr.filter(function(array){
    return this.checked;
  })
  filterByImportance(checkedBoxesArr, importance)
};

function filterByImportance(boxesChecked, importance) {
  if (boxesChecked.length > 0) {
    for (var i = 0; i < importance.length; i++) {
      $(importance[i]).parent('article').hide();
      for (var j = 0; j < boxesChecked.length; j++) {
        if ($(importance[i]).text().toLowerCase().includes(boxesChecked[j].value)) {
          $(importance[i]).parent('article').show();
        }
      }
    }
  } else {
    $(importance).parent('article').show();
  }
}

function pageLoadCard(index) {
  for (var i = index; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var cardObject = getCardId(key);
    var timeInStorage = whatTimeIsIt(cardObject);
    if (cardObject.completed === 0 && timeInStorage === true) {
      var importanceDescription = importanceAdjust(cardObject, key);
      var completedClass = completedAdjust(cardObject, key);
      prependCard(cardObject, importanceDescription, completedClass); 
    };
  };
};

function pageLoadPastDueCards() {
    for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var cardObject = getCardId(key);
    var timeInStorage = whatTimeIsIt(cardObject);
    if (cardObject.completed === 0 && timeInStorage === false) {
      cardObject.importance = 4;
      var importanceDescription = importanceAdjust(cardObject, key);
      var completedClass = completedAdjust(cardObject, key);
      prependCard(cardObject, importanceDescription, completedClass);
      $(`#${key}`).addClass('past-due');
    };
  };  
}

function whatTimeIsIt (cardObject) {
  var now = moment();
  var time = moment(cardObject.time);
  console.log(time._i);
  if (time._i === ' ') {
    timeInStorage = true;
    return timeInStorage;
  }else if (now.isBefore(time)) {
    timeInStorage = true;
    return timeInStorage;
  } else {
// FIGURE OUT HOW TO PARSE DATE    console.log(time - now);
    timeInStorage = false;
    return timeInStorage;
  }
}

function loadMoreCards() {
  for (var i = localStorage.length - 11; i >= 0; i--) {
    var key = localStorage.key(i);
    var cardObject = getCardId(key);
    if (cardObject.completed === 0) {
      var importanceDescription = importanceAdjust(cardObject, key);
      var completedClass = completedAdjust(cardObject, key);
      appendCard(cardObject, importanceDescription, completedClass); 
    };
    $('.show-more-todo').attr('disabled', true);
  };
};

function showCompletedCards () {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var cardObject = getCardId(key);
    if (cardObject.completed === 1){
      var importanceDescription = importanceAdjust(cardObject, key);
      var completedClass = completedAdjust(cardObject, key);
      prependCard(cardObject, importanceDescription, completedClass);
      updatesCardButtons(key);
    };
    $('.show-completed').attr('disabled', true);
  };
}

function updatesCardButtons(key) {
  $(`#${key}`).children('.complete-button').addClass('completed');
  $(`#${key}`).children('.complete-button').text('Task Completed');
  $(`#${key}`).children('.todo-up, .todo-down').prop('disabled', true);  
}

function SetNewToDo(title, task, date, time) {
  this.id = (new Date).getTime();
  this.title = title;
  this.task = task;
  this.importance = 2;
  this.completed = 0;
  this.time = date+ ' ' + time;
}

function createCard(event) {
  event.preventDefault();
  var newToDo = new SetNewToDo($('#title').val(), $('#task').val(), $('#due-date').val(), $('#due-time').val());
  var completedClass = completedAdjust(cardObject, key);
  prependCard(newToDo, 'Importance: Normal', completedClass);
  setCardId(newToDo.id, newToDo);
  clearForm();
};

function prependCard (newToDo, importance, completed) {
  $('.prepend').prepend(`<article id=${newToDo.id} class="${completed} parent-article"><button class="todo-delete button"></button>
    <h2 contenteditable="true" class="todo-title">${newToDo.title}</h2>
    <p contenteditable="true" class="todo-task">${newToDo.task}</p>
    <button class="todo-up button"></button><button class="todo-down button"></button>
    <p class="todo-importance-value">${importance}</p><button class="complete-button">Complete Task</button>
    <label>2Due Date: </label><time class="due-date" datetime="${newToDo.time}" contenteditable="true">${newToDo.time}</time></article>`)
}

function appendCard(newToDo, importance, completed) {
$('.prepend').append(`<article id=${newToDo.id} class="${completed} parent-article"><button class="todo-delete button"></button>
    <h2 contenteditable="true" class="todo-title">${newToDo.title}</h2>
    <p contenteditable="true" class="todo-task">${newToDo.task}</p>
    <button class="todo-up button"></button><button class="todo-down button"></button>
    <p class="todo-importance-value">${importance}</p><button class="complete-button">Complete Task</button>
    <label>2Due Date: </label><time class="due-date" datetime="${newToDo.time}">${newToDo.time}</time></article>`)
}

function enableSaveButton() {
  if ($('#title').val() !== '' && $('#task').val() !== '' && $('#task').val().length < 120 && $('#title').val().length < 120 ) {
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

function taskComplete () {
  $(this).addClass('completed');
  var key = $(this).parent().attr('id');
  var cardObject = getCardId(key);
  cardObject.importance = 0;
  cardObject.completed = 1;
  completedAdjust(cardObject, key);
  setCardId(key, cardObject);
  $(this).text("Task Completed");
}

function resumeTask () {
  $(this).removeClass('completed');
  var key = $(this).parent().attr('id');
  var cardObject = getCardId(key);
  cardObject.importance = 2;
  cardObject.completed = 0;
  completedAdjust(cardObject, key);
  setCardId(key, cardObject);
  $(this).text("Complete Task");
}

function importanceAdjust (cardObject, key) {
  var importance = cardObject.importance;
  var arr = importanceSearch(array, importance);
  $(`#${key}`).children('.todo-importance-value').text(arr[0].name);
  var importanceDescription = arr[0].name;
  return importanceDescription;
};

function completedAdjust (cardObject, key) {
  var completed = cardObject.completed;
  var arr = completedSearch(completedArray, completed);
  $(`#${key}`).attr('class', arr[0].name);
  var completedClass = arr[0].name;
  return completedClass;
}

function filterCards () {
  var filter = $('#filter').val().toLowerCase();
  var title = $('.todo-title');
  var task = $('.todo-task');
  for (var i = 0; i < title.length; i++) {
    $(title[i]).parent('article').hide();
    if ($(title[i]).text().toLowerCase().includes(filter) || $(task[i]).text().toLowerCase().includes(filter)) {
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

function completedSearch (ar, comp) {
  var arr = $.grep(ar, function(ar){
    var arr = ar.id === comp;
    return arr;
  })
  return arr;
}



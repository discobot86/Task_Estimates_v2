const t = window.TrelloPowerUp.iframe();

// This is the magic line! It tells Trello to send theme colors.
t.enable('theme');

const estimatedHoursInput = document.getElementById('estimated-hours');

t.render(function(){
  return t.get('card', 'shared', 'estimatedHours')
    .then(function(hours){
      if(hours){
        estimatedHoursInput.value = hours;
      }
    });
});

estimatedHoursInput.addEventListener('change', function(){
  t.set('card', 'shared', 'estimatedHours', estimatedHoursInput.value)
    .then(function(){
      // It's good practice not to close popups from a card-back-section
      // unless it's a specific user action.
    });
});

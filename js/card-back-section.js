// This is the final, correct code for js/card-back-section.js

const t = window.TrelloPowerUp.iframe();

const estimatedHoursInput = document.getElementById('estimated-hours');

// This function runs when the card back is rendered
t.render(function(){
  // This gets the value we saved on the card
  return t.get('card', 'shared', 'estimatedHours')
    .then(function(hours){
      if(hours){
        estimatedHoursInput.value = hours;
      }
    });
});

// This function runs when you change the value in the input box
estimatedHoursInput.addEventListener('change', function(){
  // This saves the new value to the card so it persists
  t.set('card', 'shared', 'estimatedHours', estimatedHoursInput.value);
});

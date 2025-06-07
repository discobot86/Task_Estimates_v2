// js/card-back-section.js

const t = window.TrelloPowerUp.iframe();

// This is the correct place to enable theming for this iframe.
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
  // This will now work because the script no longer crashes on t.enable()
  t.set('card', 'shared', 'estimatedHours', estimatedHoursInput.value);
});

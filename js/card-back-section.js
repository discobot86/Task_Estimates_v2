const t = window.TrelloPowerUp.iframe();

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
      t.closePopup();
    });
});

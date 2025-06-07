// js/connector.js

window.TrelloPowerUp.initialize({
  'card-back-section': function(t, options){
    // This function should ONLY return the section's properties.
    return {
      title: 'Estimated Hours',
icon: 'https://discobot86.github.io/Task_estimates/img/icon.png',
      content: {
        type: 'iframe',
        url: t.signUrl('./card-back-section.html'),
        height: 50
      }
    };
  }
});

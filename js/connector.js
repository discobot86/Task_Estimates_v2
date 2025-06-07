// js/connector.js

window.TrelloPowerUp.initialize({
  'card-back-section': function(t, options){
    // This tells Trello that your Power-Up supports dark mode
    t.enable('theme');
    
    return {
      title: 'Estimated Hours',
      icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Ftime.svg?v=1621983611952',
      content: {
        type: 'iframe',
        url: t.signUrl('./card-back-section.html'),
        height: 50 // You can adjust this height if needed
      }
    };
  }
});

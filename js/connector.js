window.TrelloPowerUp.initialize({
  'card-back-section': function(t, options){
    return {
      title: 'Estimated Hours',
      icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Ftime.svg?v=1621983611952', // A simple clock icon
      content: {
        type: 'iframe',
        url: t.signUrl('./card-back-section.html'),
        height: 50
      }
    };
  }
});

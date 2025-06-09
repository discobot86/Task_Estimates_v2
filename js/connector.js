window.TrelloPowerUp.initialize({
  /* ---------------------- */
  /* This is your existing card-back-section */
  /* ---------------------- */
  'card-back-section': function (t, options) {
    return {
      title: 'Estimated Time (hrs)',
      icon: 'https://discobot86.github.io/Task_estimates/img/icon.png',
      content: {
        type: 'iframe',
        url: t.signUrl('./card-back-section.html'),
        height: 50
      }
    };
  },

  /* ---------------------- */
  /* This is the new card-badges capability */
  /* ---------------------- */
  'card-badges': async function (t, options) {
    // Get the stored hours from the card
    const estimatedHours = await t.get('card', 'shared', 'estimatedHours');

    // Check if we have a value and it's greater than 0
    if (estimatedHours && parseFloat(estimatedHours) > 0) {
      // If we do, return an array with our badge object
      return [
        {
          text: estimatedHours + ' hrs',
          icon: 'https://discobot86.github.io/Task_estimates/img/icon.png',
          color: 'green',
          refresh: 10
        },
      ];
    } else {
      // If there are no hours, return an empty array to show nothing
      return [];
    }
  },
'list-actions': function(t) {
  return [{
    text: 'Calculate Total Hours',
    callback: function(t) {
      return t.cards('id')
        .then(function(cards) {
          const cardIds = cards.map(function(c) { return c.id; });
          //
          // THE FIX IS HERE: The scope must be 'card:shared'
          //
          return t.get(cardIds, 'card:shared', 'estimate');
        })
        .then(function(estimates) {
          const totalHours = estimates.reduce(function(sum, estimateValue) {
            const hours = parseFloat(estimateValue);
            return sum + (isNaN(hours) ? 0 : hours);
          }, 0);

          return t.alert({
            message: 'Total Hours: ' + totalHours.toFixed(1) + 'h',
            duration: 10,
          });
        })
        .catch(function(error) {
          // It's still good practice to keep this catch block
          console.error('POWER-UP FAILED:', error);
          return t.alert({
            message: 'An error occurred. Check the console.',
            duration: 10,
            display: 'error'
          });
        });
    }
  }];

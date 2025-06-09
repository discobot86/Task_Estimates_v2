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
      // This is the text that will appear in the menu
      text: 'Calculate Total Hours',
      // This function runs when you click the button
      callback: function(t) {
        // Get all cards in the list
        return t.cards('id')
          .then(function(cards) {
            const cardIds = cards.map(function(c) { return c.id; });
            // Fetch all the estimates
            return t.get(cardIds, 'shared', 'estimate');
          })
          .then(function(estimates) {
            // Sum the estimates
            const totalHours = estimates.reduce(function(sum, estimateValue) {
              const hours = parseFloat(estimateValue);
              return sum + (isNaN(hours) ? 0 : hours);
            }, 0);

            // Display the result in a notification at the top of the screen
            return t.alert({
              message: 'Total Hours: ' + totalHours.toFixed(1) + 'h',
              duration: 10, // Alert shows for 10 seconds
            });
          });
      }
    }];
  },

  // ... (the rest of your capabilities)
});

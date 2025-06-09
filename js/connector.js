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
 'list-header': function(t, options) {
    // Get all card objects in the current list
    return t.cards('id')
      .then(function(cards) {
        // Create an array of just the card IDs
        const cardIds = cards.map(function(c) { return c.id; });
        // Get the 'estimate' value from the shared storage for all cards
        return t.get(cardIds, 'shared', 'estimate');
      })
      .then(function(estimates) {
        // 'estimates' is an array of all the hour values.
        // Some values may be undefined if a card has no estimate.
        const totalHours = estimates.reduce(function(sum, estimateValue) {
          const hours = parseFloat(estimateValue);
          // Add the hours to the sum, or 0 if it's not a valid number
          return sum + (isNaN(hours) ? 0 : hours);
        }, 0);

        // Only display the header if the total is greater than zero
        if (totalHours > 0) {
          return {
            title: 'Total Hours', // This text appears on hover
            text: 'Σ ' + totalHours.toFixed(1) + 'h', // This text is displayed
          };
        }
        // Return nothing to hide the header for this list
        return null;
      });
  },

  // ... (the rest of your capabilities)
});

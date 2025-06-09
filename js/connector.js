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
});

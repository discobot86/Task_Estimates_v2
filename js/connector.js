window.TrelloPowerUp.initialize({
  /* ---------------------- */
  /* card-back-section */
  /* ---------------------- */
  'card-back-section': function(t, options) {
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
  /* card-badges */
  /* ---------------------- */
  'card-badges': async function(t, options) {
    const estimatedHours = await t.get('card', 'shared', 'estimatedHours');
    if (estimatedHours && parseFloat(estimatedHours) > 0) {
      return [{
        text: estimatedHours + ' hrs',
        icon: 'https://discobot86.github.io/Task_estimates/img/icon.png',
        color: 'green',
        refresh: 10
      }];
    }
    return [];
  },

  /* ---------------------- */
  /* list-actions */
  /* ---------------------- */
  'list-actions': function(t) {
    return [{
      text: 'Calculate Total Hours',
      callback: async function(t) {
        try {
          // 1. get all cards on the list
          const cards   = await t.cards('id');
          const cardIds = cards.map(c => c.id);

          // 2. fetch each card’s stored value
          const estimates = await Promise.all(
            cardIds.map(id =>
              t.get(id, 'card', 'shared', 'estimatedHours')
            )
          );

          // 3. sum them up
          const total = estimates.reduce(
            (sum, v) => sum + (parseFloat(v) || 0),
            0
          );

          // 4. show the result
          return t.alert({
            message: 'Total Hours: ' + total.toFixed(1) + 'h',
            duration: 10
          });
        }
        catch (err) {
          console.error('POWER-UP FAILED:', err);
          return t.alert({
            message: 'An error occurred. Check the console.',
            duration: 10,
            display: 'error'
          });
        }
      }
    }];
  }
});

// ./js/connector.js
console.log('🚀 connector.js loaded');

window.TrelloPowerUp.initialize({
  /* Card Back Section */
  'card-back-section': function(t, options) {
    return {
      title: 'Estimated Time (hrs)',
      icon: 'https://discobot86.github.io/Task_Estimates_v2/img/icon.png',
      content: {
        type: 'iframe',
        // cache-buster to ensure you’re always loading the latest iframe
        url: t.signUrl('./card-back-section.html?cb=' + Date.now()),
        height: 50
      }
    };
  },

  /* Card Badges */
  'card-badges': async function(t, options) {
    const stored = await t.get('card', 'shared', 'estimatedHours');
    const raw    = String(stored).trim();
    // only show a badge if the stored value is a valid number
    if (/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(raw)) {
      return [{
        text: raw + ' hrs',
        icon: 'https://discobot86.github.io/Task_Estimates_v2/img/icon.png',
        color: 'green',
        refresh: 10
      }];
    }
    return [];
  },

  /* List Actions */
  'list-actions': function(t) {
    return [{
      text: 'Calculate Total Hours',
      callback: async function(t) {
        try {
          // 1) get all cards on the list
          const cards   = await t.cards('id');
          const cardIds = cards.map(c => c.id);

          // 2) fetch each card’s stored value
          const estimates = await Promise.all(
            cardIds.map(cardId =>
              t.get('card', 'shared', 'estimatedHours', cardId)
            )
          );

          // DEBUG: inspect what you got back
          console.log('raw estimates:', estimates);
          console.log(
            'cleaned estimates:',
            estimates.map(v => String(v).trim().replace(/[^0-9.\-]/g, ''))
          );

          // 3) sum only pure numeric entries
          const total = estimates.reduce((sum, v) => {
            const raw = String(v).trim();
            if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(raw)) {
              return sum;
            }
            return sum + parseFloat(raw);
          }, 0);

          // 4) display the result
          return t.alert({
            message: 'Total Hours: ' + total.toFixed(2) + ' hrs',
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

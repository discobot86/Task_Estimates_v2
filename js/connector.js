'list-actions': function(t) {
  return [{
    text: 'Calculate Total Hours',
    callback: async function(t) {
      try {
        // 1) pull every card ID on this list
        const cards   = await t.cards('id');
        const cardIds = cards.map(c => c.id);

        // 2) fetch each card’s stored value
        const estimates = await Promise.all(
          cardIds.map(cardId =>
            t.get('card', 'shared', 'estimatedHours', cardId)
          )
        );

        // 2a) quick debug if you want:
        console.log('raw estimates:', estimates);

        // 3) sum, extracting only the leading number and ignoring bad values
        const total = estimates.reduce((sum, v) => {
          const cleaned = String(v).trim().replace(/[^0-9.\-]/g, '');
          const num     = parseFloat(cleaned);
          return sum + (Number.isFinite(num) ? num : 0);
        }, 0);

        // 4) show it
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

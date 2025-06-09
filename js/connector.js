window.TrelloPowerUp.initialize({
  /* … card-back-section and card-badges above … */

  /* ---------------------- */
  /* list-actions           */
  /* ---------------------- */
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

          // ──────────────────────────────
          // DEBUG: see exactly what you’re summing
          console.log('raw estimates:', estimates);
          console.log(
            'cleaned estimates:',
            estimates.map(v =>
              String(v).trim().replace(/[^0-9.\-]/g, '')
            )
          );
          // ──────────────────────────────

          // 3) sum, extracting only the leading number and ignoring bad values
          const total = estimates.reduce((sum, v) => {
            const cleaned = String(v).trim().replace(/[^0-9.\-]/g, '');
            const num     = parseFloat(cleaned);
            return sum + (Number.isFinite(num) ? num : 0);
          }, 0);

          // 4) show it with two decimals and “hrs”
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

});  // ← make sure this closes initialize()

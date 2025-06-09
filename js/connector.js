/*
  File: connector.js
  Description: A complete, corrected code block for all capabilities.
*/
TrelloPowerUp.initialize({
    // --- YOUR ORIGINAL CAPABILITIES ---
    'card-badges': function(t, options){
        return t.get('card', 'shared', 'estimate')
        .then(function(estimate){
            if(estimate && !isNaN(parseFloat(estimate))){
                return [{
                    text: 'Σ ' + estimate + 'h',
                    color: 'green'
                }];
            }
            return [];
        });
    },
    'card-detail-badges': function(t, options) {
        return t.get('card', 'shared', 'estimate')
        .then(function(estimate){
            if(estimate && !isNaN(parseFloat(estimate))){
                return [{
                    title: 'Estimate',
                    text: 'Σ ' + estimate + 'h',
                    color: 'green',
                    callback: function(t){
                        return t.popup({
                            title: "Estimation",
                            url: './estimate-popup.html',
                        });
                    }
                }]
            }
            return [];
        });
    },
    'card-buttons': function(t, options) {
        return [{
            icon: 'https://cdn.glitch.com/a84f3353-f773-441b-8533-31742447e178%2Fstopwatch.svg?v=1617299298309',
            text: 'Estimate',
            callback: function(t) {
                return t.popup({
                    title: "Estimation",
                    url: './estimate-popup.html',
                });
            }
        }];
    },

    // --- NEW, CORRECTED CAPABILITY ---
    'list-actions': function(t) {
      return [{
        text: 'Calculate Total Hours',
        callback: function(t) {
          return t.cards('id')
            .then(function(cards) {
              const cardIds = cards.map(function(c) { return c.id; });
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
              console.error('POWER-UP FAILED:', error);
              return t.alert({
                message: 'An error occurred. Check the console.',
                duration: 10,
                display: 'error'
              });
            });
        }
      }];
    }
});

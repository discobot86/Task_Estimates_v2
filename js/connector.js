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
  +  // new: show a per-list total of all “estimated-time” values
+  'list-badges': function(t, opts) {
+    return t.cards('id')
+      // pull the “estimated-time” for each card in the list
+      .then(ids =>
+        Promise.all(
+          ids.map(id => t.get(id, 'shared', 'estimated-time'))
+        )
+      )
+      // sum them and return a single badge on the list header
+      .then(vals => {
+        const total = vals.reduce((sum, v) =>
+          sum + (parseFloat(v) || 0)
+        , 0);
+        return [{
+          text: total.toFixed(2) + ' hrs',
+          title: 'Total planned time'
+        }];
+      });
+  }
});

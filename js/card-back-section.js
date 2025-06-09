console.log('✅ card-back-section.js loaded');

// ./js/card-back-section.js
const t = window.TrelloPowerUp.iframe();
const input = document.getElementById('estimated-hours');

// 1) When the iframe loads, pull whatever’s stored and show "0.00" or the saved value
t.render(async () => {
  const stored = await t.get('card', 'shared', 'estimatedHours');
  console.log('🔍 card-back stored value:', stored);
  if (Number.isFinite(parseFloat(stored))) {
    input.value = parseFloat(stored).toFixed(2);
  } else {
    input.value = '';
  }
});

// 2) On every change: parse, format, then save (or clear)
input.addEventListener('change', async (e) => {
  const n = parseFloat(e.target.value);
  if (Number.isFinite(n)) {
    const formatted = n.toFixed(2);
    input.value = formatted;  // write back so the user sees "4.00", not "4"
    await t.set('card', 'shared', 'estimatedHours', formatted);
  } else {
    input.value = '';         // clear invalid/empty
    await t.set('card', 'shared', 'estimatedHours', null);
  }
});

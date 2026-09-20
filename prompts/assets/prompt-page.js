function copyPrompt(btn, encoded){
  var text = decodeURIComponent(escape(atob(encoded)));
  function done(){
    var orig = btn.textContent;
    btn.textContent = 'COPIED ✓';
    btn.classList.add('copied');
    if (window.goatcounter) { goatcounter.count({path: '/prompt-copy-' + (document.body.dataset.slug || 'unknown')}); }
    setTimeout(function(){ btn.textContent = orig; btn.classList.remove('copied'); }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function(){ fallbackCopy(text, done); });
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, done){
  var ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); done(); } catch(e){}
  document.body.removeChild(ta);
}

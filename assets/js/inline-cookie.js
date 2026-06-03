window.handleCookieConsent=function(choice){
  try { localStorage.setItem('cookie_consent',choice); } catch(e) {}
  document.getElementById('cookie-banner').classList.remove('show');
  if(choice==='accepted'){loadGA();}
  else{denyGA();}
};